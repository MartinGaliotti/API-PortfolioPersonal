const { Router } = require("express");
const {
  editTechnologyHandler,
  deleteTechnologyHandler,
  getTechnologyByUserIdHandler,
} = require("../../handlers/technologyHandlers/technologyHandlers");

const technologyRouter = Router();

technologyRouter.get("/:id", getTechnologyByUserIdHandler);

technologyRouter.put("/:id", editTechnologyHandler);

technologyRouter.delete("/:id", deleteTechnologyHandler);

module.exports = technologyRouter;
