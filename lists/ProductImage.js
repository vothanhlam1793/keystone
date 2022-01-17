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
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const { isSignedIn, permission } = require('../access');
const cloudinaryAdapter = new CloudinaryAdapter({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: process.env.CLOUDINARY_FOLDER,
});
module.exports = {
    fields: {
        name: {
            type: Text
        },
        image: {
            type: CloudinaryImage, 
            adapter: cloudinaryAdapter
        },
        altText: {
            type: Text
        },
        product: {
            type: Relationship,
            ref: 'Product.photo'
        }
    },
    access: {
        create: permission.canManagerProducts,
        read: () => true,
        update: permission.canManagerProducts,
        delete: permission.canManagerProducts
    }
}