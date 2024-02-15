const express = require("express");
//Handlers
const {
  createUserHandler,
  updateUserHandler,
} = require("../../handlers/userHandlers/userHandlers");

const userRouter = express.Router();

userRouter.post("/", createUserHandler);

userRouter.put("/:id", updateUserHandler);

module.exports = userRouter;
