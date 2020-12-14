const express = require("express");

let acctRouter = express.Router();

// signup for account
acctRouter("/signup", async (req, res) => {

});

// login with registered account
acctRouter("/login", async (req, res) => {

});

export default acctRouter;