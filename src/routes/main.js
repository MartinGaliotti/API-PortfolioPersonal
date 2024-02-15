const { Router } = require("express");

//UserRouter
const userRouter = require("./userRouter/userRouter");

const mainRouter = Router();

mainRouter.use("/user", userRouter);

module.exports = mainRouter;
