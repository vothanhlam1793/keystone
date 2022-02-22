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
        name: {
            type: Text
        },
        type: {
            type: Text
        },
        description: {
            type: Wysiwyg
        }
    },
    access: {
        create: permission.canManagerProducts,
        delete: permission.canManagerProducts,
        update: permission.canManagerProducts
    },
    labelResolver: item => item.name
}