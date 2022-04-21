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
const { isSignedIn, permission } = require('../access');

const CF_DISTRIBUTION_ID = 'cretatech';
const S3_PATH = 'uploads';
const fileAdapterLocal = new S3Adapter({
    bucket: 'cretatech',
    folder: S3_PATH,
    publicUrl: ({ id, filename, _meta }) => {
      return _meta.Location;
    },
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
            type: Text,
            isUnique: true
        },
        description: {
          type: Text
        },
        file: {
            type: File,
            adapter: fileAdapterLocal,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                  if (existingItem && existingItem.file) {
                    await fileAdapter.delete(existingItem.file);
                  }
                },
            }, 
        }
    },
    hooks: {
      // resolveInput: async({operation, originalInput, resolvedData})=>{
      //   if(operation == "create"){
      //     // Doi ten lai cho chac;
      //     console.log(resolvedData);
      //     resolvedData.file.filename = resolvedData.name;
      //   }
      //   return resolvedData;
      // },
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
