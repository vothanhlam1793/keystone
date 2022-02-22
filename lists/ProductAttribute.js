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
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { permission, rules, isSignedIn } = require("./../access");
module.exports = {
    fields: {
        key: {
            type: Text
        },
        value: {
            type: Text
        },
        type: {
            type: Relationship,
            ref: 'ProductType'
        },
        label: {
            type: Text,
            label: "Tên ngắn"
        },
        description: {
            type: Wysiwyg,
            label: "Mô tả dài"
        },
        products: {
            type: Relationship,
            ref: "Product.attributes",
            many: true,
            label: "Kệ đi, nó tự cập nhật"
        }
    },
    access: {
        create: permission.canManagerProducts,
        delete: permission.canManagerProducts,
        update: permission.canManagerProducts
    },
    labelResolver: item => item.label
}