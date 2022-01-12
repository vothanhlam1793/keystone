var hubot = require("./hubot");
const db = require("../models");
const Model = db.carts;
var nameController = "Cart";

function createObj (data) {
    var objArray = ['name', 'phone', 'cart', 'code'];
    var a = {};
    objArray.forEach(function(e){
        a[e] = data[e];
    });
    return a;
}
// Create and Save a new Tutorial
exports.create = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Cannot empty the name"
        })
    }
    const model = new Model(createObj(req.body));
    model.save(model).then(data=>{
        res.send(data);
        var mes = [];
        mes.push("*Website có đơn mới ...*")
        mes.push("Đơn: *" + req.body.code + "*")
        mes.push("Nhanh tay gọi điện cho khách nhé!. <3 <3 <3");
        hubot.send(mes.join("\n"), "kinh_doanh");
    }).catch(e=>{
        console.log(e);
        res.status(500).send({
            message: e.message || "Error cannot create " + nameController
        })
    });  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    var master = false;
    if(req.query.pass == "asrkpvg7"){
        conditional = {};
        master = true;
    } else {
        conditional = {
            code: req.query.code
        };
    }
    console.log(conditional, req.query);
    Model.find(conditional).then(data => {
        if(master){
            res.send(data);
        } else {
            
            res.send(data.map(function(e){
                e.name = "";
                e.phone = e.phone.substring(e.phone.length-3,e.phone.length)
                return e;
            }));
        }
    }).catch(e=>{
        res.status(500).send({
            message: e.message || "Error cannot querry all"
        })
    })  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    Model.findById(req.params.id).then(data=>{
        res.send(data);
    }).catch(e=>{
        res.status(400).send({
            message: e.message || "Cannot query Transaction with id " + req.params.id
        })
    })    
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Model.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data=>{
        if(data){
            res.send({
                message: "OK"
            });
        } else {
            res.status(400).send({
                message: "Cannot update " + id
            })
        }

    }).catch(e=>{
        res.status(400).send({
            message: e.message || "Cannot find and update " + id
        })
    })  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Model.findByIdAndRemove(id).then(data=>{
        if(!data){
            res.status(400).send({
                message: "Error - not remove"
            })
        } else {
            res.send({
                message: "Ok - success"
            })
        }
    }).catch(e=>{
        res.status(500).send({
            message: "Cannot delete id " + id
        })
    })  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};