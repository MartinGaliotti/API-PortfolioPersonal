const { Router } = require("express");

const {
  getProjectsHandler,
  editProjectHandler,
  createProjectsHandler,
  deleteProjectHandler,
} = require("../../handlers/projectHandlers/projectHandlers");

const projectRouter = Router();

projectRouter.get("/:id", getProjectsHandler);

projectRouter.put("/:id", editProjectHandler);

projectRouter.post("/:id", createProjectsHandler);

projectRouter.delete("/:id", deleteProjectHandler);

module.exports = projectRouter;
