const bcrypt = require("bcrypt");

const users = {
    user1: {
        passwordHash: bcrypt.hash("user1password", 10),
        roles: ["ADMIN"],
        _id: "19a986b1-a842-4a8c-809a-e1c21102c6a3",
    },
    user2: {
        passwordHash: bcrypt.hash("user2password", 10),
        roles: ["USER"],
        _id: "38a79114-b065-4789-9773-23130d300be4",
    },
};

//async funkcia ktora vola databazu o udaje >> preto by sme vnutri pouzili await
async function findUserByUsername(username) {
    return users[username];
}

module.exports = { findUserByUsername };
