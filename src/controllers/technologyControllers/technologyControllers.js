const { User, Technology } = require("../../db");

const editTechnologyController = (id, name, image) => {
  return { error: false, message: "Edit" };
};

const deleteTechnologyController = async (id) => {
  return { error: false, message: "Delete" };
};

const getTechnologyByUserIdController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }

  const user = await User.findByPk(id);

  if (!user) {
    return { error: true, message: "Usuario no encontrado" };
  }

  const technologies = user.getTechnologies();

  return {
    error: false,
    data: technologies,
    message: "Tecnologias encontradas",
  };
};

module.exports = {
  editTechnologyController,
  deleteTechnologyController,
  getTechnologyByUserIdController,
};
