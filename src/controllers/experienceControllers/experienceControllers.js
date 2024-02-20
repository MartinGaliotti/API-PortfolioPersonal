const createExperienceController = async (userId) => {
  return "create";
};

const updateExperienceController = async (id) => {
  return "update";
};

const deleteExperienceController = async (id) => {
  return "delete";
};

const getExperienceByUserIdController = async (userId) => {
  return "get";
};

module.exports = {
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
  getExperienceByUserIdController,
};
