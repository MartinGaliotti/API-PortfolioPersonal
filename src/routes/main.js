const { Router } = require("express");

//UserRouter
const userRouter = require("./userRouter/userRouter");
//ProjectRouter
const projectRouter = require("./projectRouter/projectRouter");
//SkillsRouter
const skillsRouter = require("./skillsRouter/skillsRouter");
//TechnologyRouter
const technologyRouter = require("./technologyRouter/technologyRouter");

const mainRouter = Router();

mainRouter.use("/user", userRouter);

mainRouter.use("/project", projectRouter);

mainRouter.use("/skills", skillsRouter);

mainRouter.use("/technology", technologyRouter);

module.exports = mainRouter;
