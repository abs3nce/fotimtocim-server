//import package
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
const morgan = require("morgan");
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
        saveUninitialized: false,
        resave: false,
        cookie: {
            name: "sessionId", //zmenenie mena aby sa nedala zistit pouzita technologia
            secure: false, //nastavit na true ked bude appka bezat na https
            httpOnly: true, // clientside JS nie je schopne citanie cookie
            maxAge: 1000 * 60 * 30, //30 min zivotnost session
        },
    })
);
app.use(morgan("dev"));


const profileRoute = require("./routes/route_profile");
const loginRoute = require("./routes/route_login");

app.use("/api", profileRoute);
app.use("/api", loginRoute);

app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
);
