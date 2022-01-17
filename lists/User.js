const {
  File,
  Text,
  Slug,
  Relationship,
  Select,
  Password,
  Checkbox,
  CalendarDay,
  DateTime,
} = require('@keystonejs/fields');
const { isSignedIn, permission } = require('../access');

module.exports = {
    fields: {
        name: {
            type: Text
        },
        email: {
            type: Text,
            // isRequired: true,
            // isUnique: true
        },
        // cart: {},
        // orders: {},
        role: {
            type: Relationship,
            ref: 'Role.assignedTo',
            access: {
                create: permission.canManageUsers,
                update: permission.canManageUsers
            },
        },
        products: {
            type: Relationship,
            ref: 'Product.user',
            many: true
        },
        username: {
            type: Text,
            isRequired: true,
            isUnique: true
        },
        password: {
            type: Password
        },
        isAdmin: {
            type: Checkbox, 
            label: "Truy cập trang quản trị",
            defaultValue: false 
        },
        activate: {
            type: Checkbox,
            label: "Đang hoạt động",
            default: false
        },
        phone: {
            type: Text,
            label: "Số điện thoại",
            // isUnique: true
        }
    },
    access: {
        create: () => true,
        read: async (accessInput) => {
            if(isSignedIn){
                if(await permission.canManageUsers(accessInput)){
                    return {}
                } else {
                    return {
                        id: accessInput.authentication.item.id
                    }
                }
            } else {
                return false;
            }
        },
        update: permission.canManageUsers,
        delete: permission.canManageUsers   
    },
    hooks: {
        resolveInput: async ({operation, resolvedData, context }) => {
            if(operation == "create"){
                var a = await context.executeGraphQL({
                    query: `
                        query getCustomer($slug: String!){
                            allRoles(where: { slug: $slug }) {
                                id
                                name
                                slug
                            }
                        }
                    `,
                    variables: {
                        slug: "customer"
                    }
                });
                resolvedData.role = a.data.allRoles[0].id;
            }
            return resolvedData;
        },
        afterChange: async ({operation, originalInput, context})=>{
            if(operation == "create"){
                const { errors } = await context.executeGraphQL({
                    context: context.sudo(),
                    query: `
                    mutation findUserByUser($username: String!) {
                        startPasswordRecovery( username: $username ) {
                            token
                            user {
                                name
                            }
                        }
                    }
                    `,
                    variables: {
                        username: originalInput.username
                    },
                });
                return originalInput;
            }
        }
    }
}
