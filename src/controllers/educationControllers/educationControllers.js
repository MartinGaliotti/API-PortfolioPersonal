const { User, Education, Address, Skill, Technology } = require("../../db");

const createEducationController = async (
  userId,
  title,
  description,
  startDate,
  finishDate,
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
  finishDate && (educationData.finishDate = finishDate);

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

  // Añadir skills si las hay
  if (skills && skills.length > 0) {
    const skillsPromises = skills.map((skill) => {
      const { name, image } = skill;
      if (name && image) {
        return Skill.findOrCreate({
          where: { name },
          defaults: {
            image,
          },
        });
      }
    });
    if (skillsPromises && skillsPromises.length !== 0) {
      const skillsToAdd = await Promise.all(skillsPromises);
      const educationPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return education.addSkill(skill);
      });

      await Promise.all(educationPromises);

      const userPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return user.addSkill(skill);
      });

      await Promise.all(userPromises);
    }
  }

  // Añadir tecnologias si las hay
  if (technologies && technologies.length > 0) {
    const technologiesPromises = technologies.map((technology) => {
      const { name, image } = technology;
      if (name && image) {
        return Technology.findOrCreate({
          where: { name },
          defaults: {
            image,
          },
        });
      }
    });
    if (technologiesPromises && technologiesPromises.length !== 0) {
      const technologiesToAdd = await Promise.all(technologiesPromises);
      const educationPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return education.addTechnology(technology);
      });

      await Promise.all(educationPromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }
  }

  return {
    error: false,
    data: education,
    message: "Educación creada correctamente",
  };
};

const editEducationController = async (
  id,
  title,
  description,
  startDate,
  finishDate,
  address,
  skills,
  technologies
) => {
  if (!id) return { error: true, message: "Falta el id" };
  if (
    !title &&
    !description &&
    !startDate &&
    !finishDate &&
    !address &&
    !skills &&
    !technologies
  ) {
    return { error: true, message: "Faltan datos" };
  }
  const education = await Education.findByPk(id);
  if (!education) return { error: true, message: "Educación no encontrada" };

  title && (education.title = title);
  description && (education.description = description);
  startDate && (education.startDate = startDate);
  finishDate && (education.finishDate = finishDate);

  education.save();

  if (address) {
    const { city, state, country, street, number, zipcode } = address;
    if (city || state || country || street || number || zipcode) {
      const addressData = {};
      city && (addressData.city = city);
      state && (addressData.state = state);
      country && (addressData.country = country);
      street && (addressData.street = street);
      number && (addressData.number = number);
      zipcode && (addressData.zipcode = zipcode);
      const [newAddress] = await Address.findOrCreate({
        where: addressData,
      });
      education.setAddress(newAddress);
    }
  }

  const [user] = await education.getUsers();

  // Añadir skills si las hay
  if (skills && skills.length > 0) {
    const skillsPromises = skills.map((skill) => {
      const { name, image } = skill;
      if (name && image) {
        return Skill.findOrCreate({
          where: { name },
          defaults: {
            image,
          },
        });
      }
    });
    if (skillsPromises && skillsPromises.length !== 0) {
      const skillsToAdd = await Promise.all(skillsPromises);
      const educationPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return education.addSkill(skill);
      });

      await Promise.all(educationPromises);

      const userPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return user.addSkill(skill);
      });

      await Promise.all(userPromises);
    }

    const totalSkills = await education.getSkills();
    const promises = totalSkills.map((skill) => {
      if (!skills.find((s) => s.name === skill.name)) {
        return education.removeSkill(skill);
      }
    });
    await Promise.all(promises);
  }

  // Añadir tecnologias si las hay
  if (technologies && technologies.length > 0) {
    const technologiesPromises = technologies.map((technology) => {
      const { name, image } = technology;
      if (name && image) {
        return Technology.findOrCreate({
          where: { name },
          defaults: {
            image,
          },
        });
      }
    });
    if (technologiesPromises && technologiesPromises.length !== 0) {
      const technologiesToAdd = await Promise.all(technologiesPromises);
      const educationPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return education.addTechnology(technology);
      });

      await Promise.all(educationPromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }

    const totalTechnologies = await education.getTechnologies();
    const promises = totalTechnologies.map((technology) => {
      if (!technologies.find((t) => t.name === technology.name)) {
        return education.removeTechnology(technology);
      }
    });
    await Promise.all(promises);
  }

  return {
    error: false,
    data: education,
    message: "Educación editada correctamente",
  };
};

const deleteEducationController = async (id) => {
  if (!id) return { error: true, message: "Falta el id" };
  const education = await Education.findByPk(id);
  if (!education) return { error: true, message: "Educación no encontrada" };
  await education.destroy();
  return { error: false, message: "Educación eliminada", data: education };
};

const getEducationsByUserIdController = async (userId) => {
  if (!userId) return { error: true, message: "Falta el id del usuario" };
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Education,
      },
    ],
  });
  if (!user) return { error: true, message: "Usuario no encontrado" };
  const educations = await user.getEducation();
  return { error: false, message: "Educaciones encontradas", data: educations };
};

module.exports = {
  createEducationController,
  editEducationController,
  deleteEducationController,
  getEducationsByUserIdController,
};
