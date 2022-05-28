const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./server/.env") });

const express = require("express");
const bodyParser = require("body-parser");
const emoji = require("node-emoji");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { authRouter } = require("./server/routes/auth.routes");
const { searchRouter } = require("./server/routes/search.routes");
const { roomRouter } = require("./server/routes/room.routes");

const app = express();
const server = http.createServer(app);

mongoose
	.connect("mongodb://localhost:27017/liveplay", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected to db");
	})
	.catch((err) => {
		console.log("unable to connect to db");
		console.log("err");
	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static(path.join(__dirname, ".", "public")))
	.use(cors())
	.use(cookieParser());

app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/rooms", roomRouter);

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, ".", "build"));
});
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT || 3000, () => {
	console.log(
		emoji.get("white_check_mark"),
		`Server running on :${process.env.PORT || 3000}`
	);
});
