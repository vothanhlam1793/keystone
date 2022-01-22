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
const { Content } = require('@keystonejs/fields-content');
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const { isSignedIn, permission } = require('../access');
const cloudinaryAdapter = new CloudinaryAdapter({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: process.env.CLOUDINARY_FOLDER_MEDIA,
});
module.exports = {
    fields: {
        name: {
            type: Text
        },
        content: {
            type: Content,
            blocks: [
                Content.blocks.blockquote,
                // Content.blocks.image,
                Content.blocks.link,
                Content.blocks.orderedList,
                Content.blocks.unorderedList,
                Content.blocks.heading,
                [CloudinaryImage.blocks.image, { adapter: cloudinaryAdapter }],
            ],
        },
        altText: {
            type: Text
        },  
    },
    access: {
        create: permission.canManagerProducts,
        read: () => true,
        update: permission.canManagerProducts,
        delete: permission.canManagerProducts
    }
}