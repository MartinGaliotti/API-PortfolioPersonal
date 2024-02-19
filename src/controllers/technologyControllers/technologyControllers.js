const { User, Technology } = require("../../db");

const editTechnologyController = async (id, name, image) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  if (!name && !image) {
    return { error: true, message: "Falta el nombre" };
  }
  const technology = await Technology.findByPk(id);

  if (!technology) {
    return { error: true, message: "Tecnologia no encontrada" };
  }

  name && (technology.name = name);
  image && (technology.image = image);

  await technology.save();

  return { error: false, message: "Tecnologia editada", data: technology };
};

const deleteTechnologyController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  const technology = await Technology.findByPk(id);
  if (!technology) {
    return { error: true, message: "Tecnologia no encontrada" };
  }

  technology.destroy();

  return { error: false, message: "Tecnologia eliminada", data: technology };
};

const getTechnologyByUserIdController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }

  const user = await User.findByPk(id, {
    include: { model: Technology },
  });

  if (!user) {
    return { error: true, message: "Usuario no encontrado" };
  }

  const technologies = await user.getTechnologies();

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
