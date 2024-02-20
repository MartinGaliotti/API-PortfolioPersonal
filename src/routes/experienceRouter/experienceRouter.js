const exp = require("constants");
const {
  createExperienceHandler,
  updateExperienceHandler,
  getExperienceByUserIdHandler,
  deleteExperienceHandler,
} = require("../../handlers/experienceHandlers/experienceHandlers");

const { Router } = require("express");

const experienceRouter = Router();

experienceRouter.post("/:userId", createExperienceHandler);

experienceRouter.put("/:id", updateExperienceHandler);

experienceRouter.get("/:userId", getExperienceByUserIdHandler);

experienceRouter.delete("/:id", deleteExperienceHandler);

module.exports = experienceRouter;
