const express = require('express');
class CretaApp {
    prepareMiddleware({ keystone, dev, distDir }) {
        const app = express();
        app.use(express.static(path.join(__dirname,'public')));
        app.set('views', __dirname + "/views");
        app.set('view engine', 'ejs')


        app.get("/black", (req, res)=>{
            res.send("Hello Black");
        })

        app.get("/home", (req, res)=>{
            res.render("index");
        })
        app.get("/login", async (req, res)=>{
            res.render("user/login");
        })
        app.get("/logout", async (req, res)=>{

        })
        app.get("/info", async(req, res)=>{

        })
        app.get("/register", async(req, res)=>{

        })
        return app;
    }
}

module.exports.CretaApp = CretaApp;