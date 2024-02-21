const { User, Experience, Technology, Skill, Address } = require("../../db");

const createExperienceController = async (
  userId,
  companyName,
  job,
  description,
  startDate,
  finishDate,
  address,
  skills,
  technologies
) => {
  if (!userId) {
    return { error: true, message: "Falta el id de usuario" };
  }

  if (!companyName || !job || !startDate) {
    return { error: true, message: "Faltan datos" };
  }
  const user = await User.findByPk(userId);
  if (!user) {
    return { error: true, message: "Usuario no encontrado" };
  }

  const experienceData = { companyName, job, startDate };
  description && (experienceData.description = description);
  finishDate && (experienceData.finishDate = finishDate);

  const newExperience = await Experience.create(experienceData);

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
      newExperience.setAddress(newAddress);
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
      const experiencePromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return newExperience.addSkill(skill);
      });

      await Promise.all(experiencePromises);

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
      const experiencePromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return newExperience.addTechnology(technology);
      });

      await Promise.all(experiencePromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }
  }

  return {
    error: false,
    message: "Experiencia creada correctamente",
    data: newExperience,
  };
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
