const express = require("express");
//Handlers
const {
  createUserHandler,
  updateUserHandler,
  getUserHandler,
  deleteUserHandler,
} = require("../../handlers/userHandlers/userHandlers");

const userRouter = express.Router();

userRouter.get("/:id", getUserHandler);

userRouter.post("/", createUserHandler);

userRouter.put("/:id", updateUserHandler);

userRouter.delete("/:id", deleteUserHandler);

module.exports = userRouter;
