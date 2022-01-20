var express = require('express');
var router = express.Router();
var { getKiotViet } = require("./adapter/kiot");
async function getInfo(keystone, listKey, itemId){
    var a = await keystone.executeGraphQL({
        context: keystone.createContext({skipAccessControl: true}),
        query: `
            query check($id: ID!){
                `+listKey+`(where: { id: $id }) {
                    username
                    id
                    phone
                    email
                    name
                }
            }
        `,
        variables: {
            "id": itemId
        }
    });
    return a;
}

module.exports.router = (keystone) => {
    router.get("/register", function(req, res){
        res.render("user/register");
    })
    
    router.get("/login", function(req, res){
        res.render("user/login");
    })

    router.get("/otp", function(req, res){
        res.render("user/otp");
    })
    
    router.get("/sync", async function(req, res){
        if(req.session.keystoneListKey){
            var a = await getInfo(keystone, req.session.keystoneListKey, req.session.keystoneItemId);
            console.log("https://public.kiotapi.com/customers?contactNumber=" + a.data.User.phone);
            b = await getKiotViet("https://public.kiotapi.com/customers?contactNumber=" + a.data.User.phone);
            if(b.total > 0){
                var c = await keystone.executeGraphQL({
                    context: keystone.createContext({skipAccessControl: true}),
                    query: `
                    mutation updateUserFromKiot($id: ID!, $code: String, $name: String){
                        updateUser(id: $id, data: { code: $code, name: $name }) {
                          id
                          name
                          code
                          phone
                        }
                      }  
                    `,
                    variables: {
                        id: req.session.keystoneItemId,
                        name: b.data[0].name,
                        code: b.data[0].code
                    }
                });
                res.send(c);
            } else {
                res.send({
                    message: "Not found data in kiot with phone"
                });
            }
        } else {
            return res.send({
                message: "Authentication error"
            })
        }
    });

    router.get("/info", async function(req, res){
        console.log(req.session);
        if(req.session.keystoneListKey){
          var a = await getInfo(keystone, req.session.keystoneListKey, req.session.keystoneItemId);
          return res.send(a);
        } else {
            return res.send({
            message: "Authentication error"
          })
        }
    })

    return router;
}