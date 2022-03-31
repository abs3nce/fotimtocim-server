//import package
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
require("dotenv").config();

//init
const app = express();

app.set("trust proxy", 1); //ak budem pouzivat nginx proxy tak toto treba zapnut (nginx for sure)

const RedisStore = connectRedis(session);

//redis config
const redisClient = redis.createClient({
    port: 6379,
    host: process.env.HOST,
});

//session middleware config
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET,
        saveUnitialized: false,
        resave: false,
        cookie: {
            name: "sessionId", //zmenenie mena aby sa nedala zistit pouzita technologia
            secure: false, //nastavit na true ked bude appka bezat na https
            httpOnly: true, // clientside JS nie je schopne citanie cookie
            maxAge: 1000 * 60 * 30, //30 min zivotnost session
        },
    })
);

//vytvorenie endpointov
app.post("/login", (req, res) => {
    const { username, password } = req;

    //logika na overovanie spravnosti udajov

    req.session.username = username;
    req.session.password = password;
    req.session._id = 91283091823908102983;

    req.json("logged in");
});

//middleware na kontrolu autenticity uzivatela

app.use((req, res, next) => {
    if (!req.session || !req.session._id) {
        const err = new Error("invalid session");
        err.statusCode = 401;
        next(err);
    }
    next();
});

//protected routes
