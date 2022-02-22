var QL_GET_TYPES = `
    query {
        allProductTypes(where: {type_contains: ":"}){
            id
            type
            description
            name
        }
    }
`

_mixin_attribute = {
    data: {
        types: []
    },
    created(){
        var that = this;
        graphql(QL_GET_TYPES).then(res=>{
            that.types = res.data.allProductTypes;
        });
    }
}