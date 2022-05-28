const express = require("express");

const controller = require("../services/communication-service/room.controller");

let roomRouter = express.Router();

roomRouter.post("/create", controller.createRoom);
roomRouter.get("/info", controller.getRoomInfo);
roomRouter.get("/");
roomRouter.delete("/remove", controller.removeRoom);

module.exports.roomRouter = roomRouter;
