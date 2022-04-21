const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { Text, Password, Checkbox } = require('@keystonejs/fields');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

// File enviroment
const dotenv = require('dotenv')
dotenv.config()

// Setup
const { isSignedIn, permission } = require('./access');
const { Session, Cookie } = require("./session");

// List
const User = require("./lists/User");
const Product = require("./lists/Product");
const ProductImage = require("./lists/ProductImage");
const Role = require("./lists/Role");
const Popup = require("./lists/Popup");
const MediaImage = require("./lists/MediaImage");
const MediaFile = require("./lists/MediaFile");
const FileLocal = require("./lists/FileLocal");
const { customSchema, ForgottenPasswordToken } = require('./lists/ForgottenPasswordToken');

const PROJECT_NAME = process.env.PROJECT_NAME;
// console.log(process.env)
const adapterConfig = { 
  mongoUri: process.env.MONGO_URL,
  "user": process.env.MONGO_USER,
  "pass": process.env.MONGO_PASS,
  authSource: process.env.MONGO_AUTH_SOURCE,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  // secureCookies: false,
  sessionStore: Session.sessionStore,
  cookie: Cookie.cookie,
  cookieSecret: "THU NGHIEM MOT CAI GI DO NO DAI THIET DAI LA DUOC MA PHAI KHONG",
});

keystone.createList('User', User);
keystone.createList('Product', Product);
keystone.createList('ProductImage', ProductImage);
keystone.createList('Role', Role);
keystone.createList('ForgottenPasswordToken', ForgottenPasswordToken);
keystone.createList('Popup', Popup);
keystone.createList('MediaImage', MediaImage);
keystone.createList('MediaFile', MediaFile);
keystone.createList('FileLocal', FileLocal);
keystone.createList('ProductAttribute', require("./lists/ProductAttribute"));
keystone.createList('ProductType', require("./lists/ProductType"));

keystone.extendGraphQLSchema(customSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

class CretaApp {
  prepareMiddleware({ keystone, dev, distDir }) {
    return require("./banggiakhach/main").middle(keystone, dev, distDir);
  }
}

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(), 
    new AdminUIApp({ 
      name: PROJECT_NAME, 
      enableDefaultRoute: false , 
      authStrategy,
      isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin,
    }),
    new CretaApp(),
  ],
};
