const {
  editTechnologyController,
  deleteTechnologyController,
  getTechnologyByUserIdController,
} = require("../../controllers/technologyControllers/technologyControllers");

const editTechnologyHandler = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const response = await editTechnologyController(id, name, image);
    if (!response || response.error) {
      return res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const deleteTechnologyHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteTechnologyController(id);
    if (!response || response.error) {
      return res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const getTechnologyByUserIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getTechnologyByUserIdController(id);
    if (!response || response.error) {
      return res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = {
  editTechnologyHandler,
  getTechnologyByUserIdHandler,
  deleteTechnologyHandler,
};
