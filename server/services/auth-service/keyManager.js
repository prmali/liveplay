/*const redis = require("redis");
const client = redis.createClient();

async function setToken(token) {
    return client.set("auth-token", token);
}

async function getToken() {
    return client.get("auth-token");
}

module.exports.setToken = setToken;
module.exports.getToken = getToken;


client.on("connect", () => {
    console.log('\x1b[32m', emoji.get("white_check_mark"), "Redis connected");
});

client.on("error", err => {
    console.log('\x1b[31m', emoji.get("heavy_exclamation_mark"), "Redis error:", err);
});*/