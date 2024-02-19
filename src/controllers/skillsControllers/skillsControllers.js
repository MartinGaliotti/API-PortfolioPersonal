const { User, Skill } = require("../../db");

const deleteSkillController = async (name) => {
  if (!name) {
    return { error: true, message: "Falta el nombre" };
  }

  const skill = await Skill.findOne({ where: { name } });

  if (!skill) {
    return { error: true, message: "Skill no encontrada" };
  }

  await skill.destroy();

  return { error: false, message: "Skill eliminada" };
};

const getSkillsByUserIdController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  const user = await User.findByPk(id, {
    include: [
      {
        model: Skill,
      },
    ],
  });

  if (!user) {
    return { error: true, message: "Usuario no encontrado" };
  }

  const skills = await user.getSkills();

  return { error: false, message: "Skills encontradas", data: skills };
};

const updateSkillController = async (id, name, image) => {
  if (!id) {
    return { error: true, message: "Faltan el id" };
  }

  if (!name && !image) {
    return { error: true, message: "Faltan los datos" };
  }

  const skill = await Skill.findByPk(id);

  if (!skill) {
    return { error: true, message: "Skill no encontrada" };
  }

  name && (skill.name = name);
  image && (skill.image = image);

  await skill.save();

  return { error: false, message: "Skill actualizada", data: skill };
};

module.exports = {
  deleteSkillController,
  getSkillsByUserIdController,
  updateSkillController,
};
