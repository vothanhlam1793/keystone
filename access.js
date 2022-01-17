async function checkRole(accessInput, roleCheck){
    console.log("ACCESS INPUT", accessInput);
    var a = await accessInput.context.executeGraphQL({
        query: `
          query check($id: ID!){
                Role(where: { id: $id }) {
                    canManagerProducts
                    canSeeOtherUsers
                    canManageUsers
                    canManageRoles
                    canManageCart
                    canManageOrders
                }
          }
        `,
        variables: {
          "id": accessInput.authentication.item.role.toString()
        }
    });
    return a.data.Role[roleCheck];
}

module.exports.isSignedIn = (accessInput) => {
    if(accessInput.authentication.item){
        return true;
    } else {
        return false;
    }
}

// Danh cho quyen van hanh
module.exports.permission = {
    canManagerProducts: async function(accessInput){
        return await checkRole(accessInput, 'canManagerProducts');
    },
    canSeeOtherUsers: async function(accessInput){
        return await checkRole(accessInput, 'canSeeOtherUsers');
    },
    canManageUsers: async function(accessInput){
        return await checkRole(accessInput, 'canManageUsers');
    },
    canManageRoles: async function(accessInput){
        return await checkRole(accessInput, 'canManageRoles');
    },
    canManageCart: async function(accessInput){
        return await checkRole(accessInput, 'canManageCart');
    },
    canManageOrders: async function(accessInput){
        return await checkRole(accessInput, 'canManageOrders');
    },
}

// Danh cho filter
module.exports.rules = {
    canManageProducts: function(accessInput){
        if(!isSignedIn(accessInput)){
            return false;
        }
        if(permission.canManageProducts(accessInput)){
            return true;
        }
    }
}