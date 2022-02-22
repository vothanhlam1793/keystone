var express = require('express');
var router = express.Router();

module.exports.router = (keystone) => {
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
    return router;
}