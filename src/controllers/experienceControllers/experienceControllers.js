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

  user.addExperience(newExperience);

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

const updateExperienceController = async (
  id,
  companyName,
  job,
  description,
  startDate,
  finishDate,
  address,
  skills,
  technologies
) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  if (
    !companyName &&
    !job &&
    !startDate &&
    !description &&
    !finishDate &&
    !address &&
    !skills &&
    !technologies
  ) {
    return { error: true, message: "Faltan datos" };
  }
  const experience = await Experience.findByPk(id);
  if (!experience) {
    return { error: true, message: "Experiencia no encontrada" };
  }
  companyName && (experience.companyName = companyName);
  job && (experience.job = job);
  startDate && (experience.startDate = startDate);
  finishDate && (experience.finishDate = finishDate);
  description && (experience.description = description);

  await experience.save();

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
      experience.setAddress(newAddress);
    }
  }

  const [user] = await experience.getUsers();

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
        return experience.addSkill(skill);
      });

      await Promise.all(experiencePromises);

      const userPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return user.addSkill(skill);
      });

      await Promise.all(userPromises);
    }

    const totalSkills = await experience.getSkills();
    const promises = totalSkills.map((skill) => {
      if (!skills.find((s) => s.name === skill.name)) {
        return experience.removeSkill(skill);
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
      const experiencePromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return experience.addTechnology(technology);
      });

      await Promise.all(experiencePromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }

    const totalTechnologies = await experience.getTechnologies();
    const promises = totalTechnologies.map((technology) => {
      if (!technologies.find((t) => t.name === technology.name)) {
        return experience.removeTechnology(technology);
      }
    });
    await Promise.all(promises);
  }

  return {
    error: false,
    data: experience,
    message: "Experiencia actualizada correctamente",
  };
};

const deleteExperienceController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  const experience = await Experience.findByPk(id);
  if (!experience) {
    return { error: true, message: "Experiencia no encontrada" };
  }
  await experience.destroy();
  return {
    error: false,
    message: "Experiencia eliminada correctamente",
    data: experience,
  };
};

const getExperienceByUserIdController = async (userId) => {
  if (!userId) {
    return { error: true, message: "Falta el id" };
  }
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Experience,
      },
    ],
  });
  if (!user) {
    return { error: true, message: "Usuario no encontrado" };
  }
  const experiences = await user.getExperiences();
  return {
    error: false,
    message: "Experiencias obtenidas correctamente",
    data: experiences,
  };
};

module.exports = {
  createExperienceController,
  updateExperienceController,
  deleteExperienceController,
  getExperienceByUserIdController,
};
