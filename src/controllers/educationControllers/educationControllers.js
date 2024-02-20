const { User, Education, Address } = require("../../db");

const createEducationController = async (
  userId,
  title,
  description,
  startDate,
  endDate,
  address,
  skills,
  technologies
) => {
  if (!userId) return { error: true, message: "Falta el id del usuario" };
  if (!title || !description || !startDate) {
    return { error: true, message: "Faltan datos" };
  }

  const user = await User.findByPk(userId);

  if (!user) return { error: true, message: "Usuario no encontrado" };

  const educationData = {
    title,
    description,
    startDate,
  };
  endDate && (educationData.endDate = endDate);

  const education = await Education.create(educationData);

  await user.addEducation(education);

  if (address) {
    const { city, state, country, street, number, zipcode } = address;
    if (city || state || country || street || number || zipcode) {
      const [newAddress] = await Address.findOrCreate({
        where: {
          city,
          state,
          country,
          street,
          number,
          zipcode,
        },
      });
      education.setAddress(newAddress);
    }
  }

  return {
    error: false,
    data: education,
    message: "Educación creada correctamente",
  };
};

const editEducationController = async () => {
  return "edit";
};

const deleteEducationController = async () => {
  return "delete";
};

const getEducationsByUserIdController = async () => {
  return "get";
};

module.exports = {
  createEducationController,
  editEducationController,
  deleteEducationController,
  getEducationsByUserIdController,
};
