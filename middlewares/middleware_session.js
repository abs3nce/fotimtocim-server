//session middleware config

const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../database/redis_client");
const RedisStore = connectRedis(session);
require("dotenv").config();

module.exports = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: "sessionId", //zmenenie mena aby sa nedala zistit pouzita technologia
    cookie: {
        secure: false, //nastavit na true ked bude appka bezat na https
        httpOnly: true, // clientside JS nie je schopne citanie cookie
        maxAge: 1000 * 60 * 30, //30 min zivotnost session
    },
});
