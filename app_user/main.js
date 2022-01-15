const EXTEND_URL = "/user_app"
const express = require("express");
var logger = require('morgan')
const app = express();
const path = require('path')

app.use(logger('dev'));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs')
app.use(EXTEND_URL + "/public",express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(EXTEND_URL + "/", require("./route/index"));


module.exports.middle = app;