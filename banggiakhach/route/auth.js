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

module.exports.isAuth = async (req, res) => {
    if(req.session.keystoneListKey){
        var a = await getInfo(keystone, req.session.keystoneListKey, req.session.keystoneItemId);
        return res.send(a);
    } else {
        return res.send({
            message: "Authentication error"
        })
    }
}