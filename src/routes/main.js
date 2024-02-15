const { Router } = require("express");

//UserRouter
const userRouter = require("./userRouter/userRouter");
//ProjectRouter
const projectRouter = require("./projectRouter/projectRouter");

const mainRouter = Router();

mainRouter.use("/user", userRouter);

mainRouter.use("/project", projectRouter);

module.exports = mainRouter;
