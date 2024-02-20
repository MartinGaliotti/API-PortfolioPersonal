const { Router } = require("express");
const {
  editEducationHandler,
  getEducationsByUserIdHandler,
  deleteEducationHandler,
  createEducationHandler,
} = require("../../handlers/educationHandlers/educationHandlers");

const educationRouter = Router();

educationRouter.get("/:userId", getEducationsByUserIdHandler);

educationRouter.post("/:userId", createEducationHandler);

educationRouter.delete("/:id", deleteEducationHandler);

educationRouter.put("/:id", editEducationHandler);

module.exports = educationRouter;
