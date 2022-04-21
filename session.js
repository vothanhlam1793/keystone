const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');

var db = new MongoClient(process.env.MONGO_URL_SESSION,{
    auth: {
        "user": process.env.MONGO_USER,
        "password": process.env.MONGO_PASS,
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
        secure: false,
        // secure: process.env.NODE_ENV === 'production', // Default to true in production
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: false,
    }    
}

