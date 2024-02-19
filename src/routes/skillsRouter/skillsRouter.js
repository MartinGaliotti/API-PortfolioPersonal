const { Router } = require("express");
const {
  deleteSkillHandler,
  getSkillsByUserIdHandler,
  updateSkillHandler,
} = require("../../handlers/skillsHandlers/skillsHandlers");

const skillsRouter = Router();

skillsRouter.get("/:id", getSkillsByUserIdHandler);

skillsRouter.delete("/:name", deleteSkillHandler);

skillsRouter.put("/:id", updateSkillHandler);

module.exports = skillsRouter;
