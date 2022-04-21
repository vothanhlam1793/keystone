var express = require('express');
var router = express.Router();
const dirTree = require("directory-tree");
// const multer = require('multer');
// SET STORAGE

module.exports.router = (keystone) => {
    var multer = require('multer');
    var upload = multer({ storage: storagePC })
    var storagePC = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../public/uploads') // thu muc
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
    
    router.get("/", (req, res)=>{
        res.render("pc-creta/index");
    });
    router.get("/find", (req, res)=>{
        res.render("pc-creta/find/index");
    });
    router.get("/compare", (req, res)=>{
        res.render("pc-creta/compare/index");
    });
    router.get("/types", (req, res)=>{
        res.render("pc-creta/types/index");
    });

    router.get("/create", (req, res)=>{
        res.render("pc-creta/create/index");
    });

    router.post('/uploadfile', (req, res, next) => {
        console.log("HERE");
        // const file = req.file
        // if (!file) {
        //   const error = new Error('Please upload a file')
        //   error.httpStatusCode = 400
        //   return next(error)
        // }
        // res.send(file)
    })
    router.get('/upload',function(req,res){
        res.render("pc-creta/basic/index1.ejs");
    })
    router.get('/lists',function(req,res){
        res.render("pc-creta/basic/index2.ejs");
    })
    router.get("/listsName", (req, res)=>{
        res.send(dirTree(__dirname + '/../../public/uploads'));
    })
        
    return router;
}