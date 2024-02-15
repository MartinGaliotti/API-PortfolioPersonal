const express = require("express");
const server = express();
const mainRouter = require("./routes/main");
const cors = require("cors");

server.use(cors());

server.use(express.json());

server.use("/", mainRouter);

module.exports = server;
