const { Router } = require("express");

const {
  getProjectsHandler,
  createProjectsHandler,
} = require("../../handlers/projectHandlers/projectHandlers");

const projectRouter = Router();

projectRouter.get("/:id", getProjectsHandler);

projectRouter.post("/:id", createProjectsHandler);

module.exports = projectRouter;
