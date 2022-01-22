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
const { S3Adapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');
const { isSignedIn, permission } = require('../access');

const CF_DISTRIBUTION_ID = 'cretatech';
const S3_PATH = 'uploads';
const fileAdapter = new S3Adapter({
    bucket: 'cretatech',
    folder: S3_PATH,
    s3Options: {
      // Optional paramaters to be supplied directly to AWS.S3 constructor
      apiVersion: process.env.S3_VERSION,
      accessKeyId: process.env.S3_API_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    },
    uploadParams: ({ filename, id, mimetype, encoding }) => ({
      Metadata: {
        keystone_id: `${id}`,
      },
    }),
});

module.exports = {
    fields: {
        name: {
            type: Text
        },
        file: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                  if (existingItem && existingItem.file) {
                    await fileAdapter.delete(existingItem.file);
                  }
                },
            }, 
        },
        code: {
            type: Text,
        }  
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
          if (existingItem.file) {
            await fileAdapter.delete(existingItem.file);
          }
        },
    },
    access: {
        create: permission.canManagerProducts,
        read: () => true,
        update: permission.canManagerProducts,
        delete: permission.canManagerProducts
    }
}
