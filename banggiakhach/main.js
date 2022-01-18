const express = require("express"); 
var logger = require('morgan')
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path')

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
      "user": "black",
      "pass": "asrkpvg7",
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
});

function middle(keystone, dev, distDir){
  app.use(fileUpload());
  app.use(logger('dev'));
  app.set('views', __dirname + "/views");
  app.set('view engine', 'ejs')
  app.use(express.static(path.join(__dirname,'public')))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  require("./route/tool.route")(app);
  require("./route/customer")(app);
  app.use("/baogia", require("./route/baogia"));
  app.use("/product", require("./route/product"));
  require("./app/routes/product.route")(app);
  require("./app/routes/cart.route")(app);
  app.use("/user", require("./route/user").router(keystone));

  app.get('*', function(req, res){
    res.render("customer/index", {
      title: "Bảng giá phụ kiện"
    })
  });
  return app;
}

module.exports.middle = middle;