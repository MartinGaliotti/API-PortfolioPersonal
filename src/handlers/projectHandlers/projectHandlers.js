const {
  getProjectsController,
  editProjectController,
  createProjectsController,
  deleteProjectController,
} = require("../../controllers/projectControllers/projectControllers");

const getProjectsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProjectsController(id);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const editProjectHandler = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    url,
    image,
    startDate,
    finishDate,
    skills,
    technologies,
  } = req.body;
  try {
    const response = await editProjectController(
      id,
      title,
      description,
      url,
      image,
      startDate,
      finishDate,
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

const createProjectsHandler = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    url,
    image,
    startDate,
    finishDate,
    skills,
    technologies,
  } = req.body;
  try {
    const response = await createProjectsController(
      id,
      title,
      description,
      url,
      image,
      startDate,
      finishDate,
      skills,
      technologies
    );
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteProjectHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProjectController(id);
    if (!response || response.error) {
      res.status(400).json(response);
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  getProjectsHandler,
  editProjectHandler,
  createProjectsHandler,
  deleteProjectHandler,
};
