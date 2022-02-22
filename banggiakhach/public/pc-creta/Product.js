var QL_GET_PRODUCT_BY_ID = `
query getProduct($id: ID!){
    Product(where: {id: $id}){
        name
        description
        photo {
          id
        }
        status
        price
        attributes {
          id
          label
          type {
            id
            name
            type
            description
          }
          key
          value
        }
        type {
          id
        }
    }
}

`

var QL_CONNECT_ATTRIBUE = `
mutation add($id: ID!){
    updateProduct(id: $id, data: {
      attributes: {
      connect: $aId
    }    
    }){
      id
      name
      attributes {
        id
        label
      }
    }
  }
`

function createQL(aId){
    var ql = "[";
    aId.forEach(function(e, i){
        if(i > 0){
            ql += ",";
        }
        ql += "{id: \"" + e + "\"}";
    });
    ql += "]";
    return ql;
}

function createQLConnect(aId){
    return `
mutation add($id: ID!){
    updateProduct(id: $id, data: {
      attributes: {
      connect: ` + createQL(aId) + `
    }    
    }){
      id
      name
      attributes {
        id
        label
      }
    }
  }
`
}
function createQLDisconnect(aId){
    return `
mutation add($id: ID!){
    updateProduct(id: $id, data: {
      attributes: {
        disconnect: ` + createQL(aId) + `
    }    
    }){
      id
      name
      attributes {
        id
        label
      }
    }
  }
`
}

class PCProduct {
    constructor(id){
        if(typeof id == "string"){
          this.id = id;
        } else {
          this.id = id.id;
          this.product = id;
        }
        this.load = false;
        var that = this;
        this.fetch(function(){
            that.load = true;
        })
    }
    setName(name, cb){
        var that=this;
        graphql(`
            mutation {
                updateProduct(id: "` + this.id + `", data: {name: "`+name+`"}){
                    name
                    id
                }
            }
        `).then(res=>{
            that.fetch(cb);
        })
    }
    setPrice(price, cb){
        var that=this;
        graphql(`
            mutation {
                updateProduct(id: "` + this.id + `", data: {price: `+price+`}){
                    name
                    id
                }
            }
        `).then(res=>{
            that.fetch(cb);
        })    }
    getPrice(){
        return this.product.price;
    }
    getName(){
        return this.product.name;
    }
    getAttributes(){
        return this.product.attributes;
    }
    addAttributes(ids){
        graphql(createQLConnect(ids), {id: this.id}).then(res=>{
            
        });
    }
    removeAttributes(ids){
        graphql(createQLDisconnect(ids), {id: this.id}).then(res=>{
            
        });
    }
    fetch(cb){
        var that = this;
        graphql(QL_GET_PRODUCT_BY_ID, {id: this.id}).then(res=>{
            that.product = res.data.Product;
            if(cb){
                cb(that.product);
            }
        })
    }
}