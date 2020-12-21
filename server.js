const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "./server/.env")});

const express = require("express");
const bodyParser = require("body-parser");
const emoji = require("node-emoji");
const http = require("http");
//const socketIo = require("socket.io");
const cors = require("cors")
const cookieParser = require("cookie-parser");

const { authRouter } = require("./server/routes/auth.routes");
const { searchRouter } = require("./server/routes/search.routes");

const app = express();
const server = http.createServer(app);
//const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static(path.join(__dirname, ".", "public")))
    .use(cors())
    .use(cookieParser());

app.use("/auth", authRouter);
app.use("/search", searchRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, ".", "build"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


// io.on("connection", socket => {
//     console.log(emoji.get("white_check_mark"), `User connected on :${socket}`);
//     socket.on("disconnect", () => {
//         console.log(emoji.get("white_check_mark"), `User disconnected on ${socket}`);
//     })
// });

server.listen(process.env.PORT || 3000, () => {
    console.log(emoji.get("white_check_mark"), `Server running on :${process.env.PORT || 3000}`);
});