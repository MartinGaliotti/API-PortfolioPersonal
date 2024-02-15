const {
  getProjectsController,
  createProjectsController,
} = require("../../controllers/projectControllers/projectControllers");

const getProjectsHandler = async (req, res) => {
  try {
    const response = await getProjectsController();
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const createProjectsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await createProjectsController(id);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { getProjectsHandler, createProjectsHandler };
