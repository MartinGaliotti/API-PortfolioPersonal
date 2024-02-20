const {
  createExperienceController,
  updateExperienceController,
  getExperienceByUserIdController,
  deleteExperienceController,
} = require("../../controllers/experienceControllers/experienceControllers");

const createExperienceHandler = async (req, res) => {
  const { userId } = req.params;
  const {
    company,
    job,
    description,
    startDate,
    finishDate,
    address,
    skills,
    technologies,
  } = req.body;

  try {
    const response = await createExperienceController(
      userId,
      company,
      job,
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

const updateExperienceHandler = async (req, res) => {
  const { id } = req.params;
  const {
    company,
    job,
    description,
    startDate,
    finishDate,
    address,
    skills,
    technologies,
  } = req.body;

  try {
    const response = await updateExperienceController(
      id,
      company,
      job,
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

const deleteExperienceHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteExperienceController(id);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getExperienceByUserIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await getExperienceByUserIdController(userId);
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
  createExperienceHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
  getExperienceByUserIdHandler,
};
