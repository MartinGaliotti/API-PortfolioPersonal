const {
  deleteSkillController,
  getSkillsByUserIdController,
  updateSkillController,
} = require("../../controllers/skillsControllers/skillsControllers");

const getSkillsByUserIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getSkillsByUserIdController(id);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteSkillHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await deleteSkillController(name);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateSkillHandler = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const response = await updateSkillController(id, name, image);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  deleteSkillHandler,
  getSkillsByUserIdHandler,
  updateSkillHandler,
};
