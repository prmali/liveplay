const express = require("express");
const fromYoutube = require("../services/search-service/fromYoutube");

let searchRouter = express.Router();

// query on youtube
searchRouter.get("/youtube", fromYoutube.search);

module.exports.searchRouter = searchRouter;