const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { Text, Password, Checkbox } = require('@keystonejs/fields');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const PROJECT_NAME = 'ks5';
const adapterConfig = { 
  mongoUri: 'mongodb://node.creta.work:30042/ks5-data',
  "user": "black",
  "pass": "asrkpvg7",
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true
};
// const { CretaApp } = require("./src/index");

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */
var db = new MongoClient("mongodb://node.creta.work:30042/ks5",{
  auth: {
    "user": "black",
    "password": "asrkpvg7"
  },
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  sessionStore: MongoStore.create({ 
    clientPromise: db.connect()
  }),
  cookie: {
    // secure: true,
    // secure: process.env.NODE_ENV === 'production', // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  cookieSecret: "THU NGHIEM MOT CAI GI DO NO DAI THIET DAI LA DUOC MA PHAI KHONG",
});

keystone.createList('User', {
  access: {
    // 1. Only admins can read deactivated user accounts
    read: ({ authentication: { item } }) => {
      if (item.isAdmin) {
        return {}; // Don't filter any items for admins
      }
      // Approximately; users.filter(user => user.state !== 'deactivated');
      return {
        state_not: 'deactivated',
      };
    },
  },
  fields: {
    username: {
      type: Text
    },
    password: {
      type: Password
    },
    isAdmin: { type: Checkbox, defaultValue: false },

  }
})

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
    return require("./banggiakhach/main").middle;
  }
}

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(), 
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: false , authStrategy}),
    new CretaApp(),
  ],
};
