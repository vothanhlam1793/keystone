var express = require('express');
var router = express.Router();
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
    
    router.get("/info", async function(req, res){
        
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