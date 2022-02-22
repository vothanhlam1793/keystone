var express = require('express');
var router = express.Router();

module.exports.router = (keystone) => {
    router.get("/", (req, res)=>{
        res.render("pc-creta/index");
    });
    router.get("/find", (req, res)=>{
        res.render("pc-creta/find/index");
    });
    return router;
}