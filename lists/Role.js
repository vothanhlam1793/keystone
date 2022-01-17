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
            type: Text,
            isRequired: true
        },
        slug: {
            type: Text,
            isUnique: true
        },
        canManagerProducts: {
            type: Checkbox,
            label: "Quản lý sản phẩm"
        },
        canSeeOtherUsers: {
            type: Checkbox,
            label: "Xem danh sách thành viên"
        },
        canManageUsers: {
            type: Checkbox,
            label: "Sửa thông tin thành viên"
        },
        canManageRoles: {
            type: Checkbox,
            label: "Quản lý quyền"
        },
        canManageCart: {
            type: Checkbox,
            label: "Quản lý giỏ hàng"
        },
        canManageOrders: {
            type: Checkbox,
            label: "Quản lý đơn hàng"
        },
        assignedTo: {
            type: Relationship,
            ref: 'User.role',
            many: true
        }
    },
    access: {
        read: ()=>true,
        create: permission.canManageRoles,
        delete: permission.canManageRoles,
        update: permission.canManageRoles,
    }
}