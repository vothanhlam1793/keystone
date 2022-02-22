var QL_SEARCH_PRODUCT_MIXIN = `
    # Write your query or mutation here
    query ($name: String){
        allProducts(where: {name_contains: $name}){
            name
            id
        }
    }
`
var _support_search = {
    data: {
        fProducts: []
    },
    methods: {
        findProduct: function(name){
            var that = this;
            that.fProducts = [];
            graphql(QL_SEARCH_PRODUCT_MIXIN, {name: name}).then(res=>{
                res.data.allProducts.forEach(function(product){
                    that.fProducts.push(new PCProduct(product));
                })
            });
        },
    }
}