const {
  editEducationController,
  getEducationsByUserIdController,
  deleteEducationController,
  createEducationController,
} = require("../../controllers/educationControllers/educationControllers");

const createEducationHandler = async (req, res) => {
  const { userId } = req.params;
  const {
    title,
    description,
    startDate,
    finishDate,
    address,
    skills,
    technologies,
  } = req.body;
  try {
    const response = await createEducationController(
      userId,
      title,
      description,
      startDate,
      finishDate,
      address,
      skills,
      technologies
    );

    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const editEducationHandler = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    startDate,
    finishDate,
    address,
    skills,
    technologies,
  } = req.body;
  try {
    const response = await editEducationController(
      id,
      title,
      description,
      startDate,
      finishDate,
      address,
      skills,
      technologies
    );

    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getEducationsByUserIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await getEducationsByUserIdController(userId);

    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteEducationHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteEducationController(id);

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
  deleteEducationHandler,
  editEducationHandler,
  getEducationsByUserIdHandler,
  createEducationHandler,
};
