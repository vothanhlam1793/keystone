var QL_GET_PRODUCT_ATTRIBUTE_BY_ID = `
query getPA($id: ID!){
    ProductAttribute (where: {id: $id}){
        id
        key
        value
        label
        description
    }
  }
`
var QL_GET_ATTRIBUTE_BY_TYPE = `
    query getAttributes($id:ID!){
        allProductAttributes(where: {type: {id: $id}}){
            id
            value
            key
            label
            description
        }
    }
`
var QL_GET_TYPE_BY_ID = `
    query getAT($id: ID!){
        ProductType(where: {id: $id}){
            name
            type
            description
        }
    }
`

var QL_CREATE_ATTRIBUTE = `
    mutation create($key:String, $value: String, $typeId: ID!, $label: String) {
        createProductAttribute(data: {
            value: $value, 
            key: $key, 
            label: $label,
            type: {
                connect: {
                    id: $typeId
                }
            }
        }){
            id
            value
            key
            label
            description
        }
    }
`

class Attributes{
    constructor(obj, fetch){
        if(typeof obj){
            this.attribute = obj
        } else {
            this.attribute = {}
        }
        if(fetch){
            this._reload();
        }
    }
    _reload(cb){
        graphql(QL_GET_PRODUCT_ATTRIBUTE_BY_ID, {id: this.attribute.id}).then(res=>{
            this.attribute = res.data.ProductAttribute;
            if(cb){
                cb(this.attribute);
            }
        });
    }
}


class AttributeType {
    constructor(id){
        this.id = id;
        this.type = {};
        this.attributes = [];
        this.load = false;
        this.value = [];
        var that = this;
        this.fetch(function(){
            that.load = true;
        });
    }
    getAttributes(){
        return this.attributes;
    }
    getName(){
        return this.type.name;
    }
    getKey(){
        if(this.type){
            return this.type.type.split(":")[0];
        } else {
            return undefined;
        }
    }
    getSelect(){
        if(this.type.type){
            return this.type.type.split(":")[1];
        } else {
            return undefined;
        }
    }
    add(value, label){
        var obj = {
            key: this.getKey(),
            value: value,
            typeId: this.id,
            label: label
        }
        var that = this;
        graphql(QL_CREATE_ATTRIBUTE, obj).then(res=>{
            console.log(res);
            that.fetch();
        })
    }
    fetch(cb){
        graphql(QL_GET_TYPE_BY_ID, {id: this.id}).then(res=>{
            this.type = res.data.ProductType;
            if(cb){
                cb(this.type);
            }
        });
        graphql(QL_GET_ATTRIBUTE_BY_TYPE, {id: this.id}).then(res=>{
            this.attributes = res.data.allProductAttributes;
            if(cb){
                cb(this.attributes);
            }
        });
    }
}