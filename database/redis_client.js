//redis client config
const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    port: 6379,
    host: process.env.HOST,
});

module.exports = redisClient;
