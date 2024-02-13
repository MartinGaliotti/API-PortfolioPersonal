const express = require("express");
const server = express();

server.use("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = server;
