const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');

var db = new MongoClient("mongodb://node.creta.work:30042/ks5",{
    auth: {
        "user": "black",
        "password": "asrkpvg7"
    },
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true
});

exports.Session = {
    sessionStore: MongoStore.create({ 
        clientPromise: db.connect()
    })
}

exports.Cookie = {
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Default to true in production
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: false,
    }    
}

