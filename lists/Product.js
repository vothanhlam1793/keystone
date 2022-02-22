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
  Integer,
//   Wysiwyg
} = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { permission, rules, isSignedIn } = require("./../access");
module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true.valueOf,
            isUnique: true
        },
        description: {
            type: Wysiwyg
        },
        photo: {
            type: Relationship,
            ref: 'ProductImage.product',
            many: true
        },
        status: {
            type: Select,
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT'
        },
        price: {
            type: Integer
        },
        attributes: {
            type: Relationship,
            ref: 'ProductAttribute.products',
            many: true
        },
        type: {
            type: Relationship,
            ref: 'ProductType',
        }
    },
    access: {
        create: permission.canManagerProducts,
        delete: permission.canManagerProducts,
        update: permission.canManagerProducts
    }
}