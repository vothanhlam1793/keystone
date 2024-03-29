var url= "https://script.google.com/macros/s/AKfycbxpn0Yxexari6sRTbBrfQD6l619IjqjmOLSx8tQRze0Dv91z6gHz6HX2D5Zw8vz5I3Y/exec";
var fetch = require("node-fetch");
const fs = require('fs');
const { addAbortSignal } = require("stream");

var objProduct = {
    date: new Date("2000-01-01"),
    data: []
}
var Products = {
    data: []
};

async function getProducts(pNew){
    if(pNew == 1){
        Products.data = [];
        var j = await getSheetData(url + "?sheetName=BANGGIA", 1);
        Products.data = Products.data.concat(j.map(function(e){
            return {
                name: e.name,
                price: e.price_3,
                type: "PHUKIEN",
                branch: "Phụ kiện camera",
                sheet: e.group || ""
            }
        }))
        var k = await getSheetData(url + "?sheetName=KHUYENMAICAM", 1);
        Products.data = Products.data.concat(k.map(function(e){
            return {
                name: e.name,
                price: e.price_3,
                type: "Khuyến mãi",
                branch: e.branch || "",
                sheet: e.group || ""
            }
        }))

        var l = await getSheetData(url + "?sheetName=CAMERAWIFI", 1);
        Products.data = Products.data.concat(l.map(function(e){
            return {
                name: e.name,
                price: e.price_3,
                type: "Camera Wifi",
                branch: e.branch || "",
                sheet: e.group || ""
            }
        }))
        console.log("DONE - update data", k.length, j.length, l.length);
    } else {
        return Products.data;
    }
}

async function getSheetData(pUrl, pNew){
    var t1 = new Date();
    var vNew = pNew;
    if(((new Date()).getTime() - objProduct.date.getTime()) > 86400*1000){
        vNew = 1;   
    }
    if(vNew == 1){
        var res = await fetch(pUrl);
        var j = {};
        try {
            j = await res.json();
        } catch (e) {
            
        }
        objProduct.date = new Date();
        objProduct.data = j;
    }
    return objProduct.data;
}

module.exports = (keystone) => {
    var router = require("express").Router(); 
    router.get("/", (req, res)=>{
        console.log(req.query);
        res.render("customer/homepage", {
            title: "Phụ kiện Creta"
        })
    })

    router.get("/banggia", (req, res)=>{
        console.log(req.query);
        if(req.session.keystoneListKey){
            res.render("customer/index", {
                title: "Bảng giá phụ kiện"
            })
        } else {
            res.redirect("/thongbao");
        }
    })

    router.get("/thongbao", (req, res) => {
        res.render("customer/thongbao", {
            title: "Thông báo"
        });
    });

    router.get("/modal", async (req, res)=>{
        var QUERY_MODAL = ``;
        if(req.session.keystoneListKey){
            QUERY_MODAL = `
            query getPopup ($id: ID!, $now: String!) {
                allPopups(where: {
                   AND: [{
                    notSeen_none: {id: $id}
                  },{
                    startDate_lte: $now
                  }, {
                    endDate_gte: $now
                  }]
                }){
                  id
                  title
                  content
                }
              }
            `;
        } else {
            QUERY_MODAL = `
            query getPopup ($id: ID!, $now: String!) {
                allPopups(where: {
                   AND: [{
                    startDate_lte: $now
                  }, {
                    endDate_gte: $now
                  }]
                }){
                  id
                  title
                  content
                }
              }
            `;
        }  
        var c = await keystone.executeGraphQL({
            context: keystone.createContext({skipAccessControl: true}),
            query: QUERY_MODAL,
            variables: {
                id: req.session.keystoneItemId,
                now: (new Date()).toISOString()
            }
        });
        res.send(c);
    });

    router.get("/notseenmodal", async(req, res) => {
        if(req.session.keystoneItemId && req.query.id){
            var GRAPHQL_NOT_SEEN = ``;
            if(req.query.notseen == 1){
                GRAPHQL_NOT_SEEN = `
                    mutation addUserNotSeenPopUp($id: ID!, $idUser: ID!){
                        updatePopup(id: $id, data: {
                            notSeen: {
                                connect: {id: $idUser}
                            }
                        }){
                            id
                            title
                        }
                    }
                `;
            } else {
                GRAPHQL_NOT_SEEN = `
                mutation addUserNotSeenPopUp($id: ID!, $idUser: ID!){
                    updatePopup(id: $id, data: {
                      notSeen: {
                        disconnect: {id: $idUser}
                      }
                    }){
                      id
                      title
                    }
                }
                `
            }
            var c = await keystone.executeGraphQL({
                context: keystone.createContext({skipAccessControl: true}),
                query: GRAPHQL_NOT_SEEN,
                variables: {
                    idUser: req.session.keystoneItemId,
                    id: req.query.id
                }
            });
            res.send(c);
        } else {
            res.send({
                message: "Not Auth",
                status: "ERROR"
            })
        }
    });

    router.post("/modal", (req, res)=>{
        if(req.body.pwd != "asrkpvg7"){
             return res.status(200).send("Xin chào!. Bằng cách nào đó bạn không nhập đúng password!. Hỏi Sếp nhé!.");
        }
        req.body.pwd = "";
        var m = require(__dirname + "/data/modal.json");
        // console.log(req.body, m);

        if (!req.files || Object.keys(req.files).length === 0) {
            let data = JSON.stringify(req.body);
            fs.writeFileSync(__dirname + '/data/modal.json', data);
            res.send("Đã cập nhật");
        } else {
            // Co luu file
            console.log(req.files);
            sampleFile = req.files.img;
            req.body.img = sampleFile.name;
            uploadPath = __dirname + '/../public/images/modal/' + sampleFile.name;
            sampleFile.mv(uploadPath, function(err) {
                if (err)
                    return res.status(500).send(err);
                // res.send('File uploaded!');
                res.send("Đã cập nhật");
            });
            let data = JSON.stringify(req.body);
            fs.writeFileSync(__dirname + '/data/modal.json', data);
        }
    })

    router.get("/setModal", (req, res)=>{
        res.render("customer/createModal");
    })

    router.get("/info", (req, res)=>{
        res.render("customer/info", {
            title: "Liên hệ"
        })
    })
    router.get("/howtobuy", (req, res)=>{
        res.render("customer/howtobuy", {
            title: "Liên hệ"
        })
    })

    router.get("/data", async (req, res) => {
        var data = [];
        // Get data from Sheet
        data = await getProducts();

        // Get data from file excel
        var temp = require("../createData").products;
        temp = temp.map(function(e){
            return {
                name: e.productNameColumn,
                price: e.cap3,
                type: "CATALOG",
                branch: e.branch,
                sheet: e.sheet
            };
        });

        // Concat 2 du lieu lai voi nhau
        data = data.concat(temp);
        res.send(data);
    })
    
    router.get("/cart", function(req, res){
        res.render("cart/index", {
            title: "Giỏ hàng"
        })
    })

    router.get("/renew", async function(req, res){
        await getProducts(1);
        res.send({
            message: "OK"
        })
    })
    router.get("/demo", function(req, res){
        res.render("customer/index_temp", {
            title: "Giỏ hàng"
        })
    })
    router.get("/viewpacking", function(req, res){
        res.render("customer/index_xemlaidon", {
            title: "Giỏ hàng"
        })
    })

    router.get("/test", (req, res) => {
        res.render("test");
    })
    require("../createData");
    getProducts(1);
    return router;
}