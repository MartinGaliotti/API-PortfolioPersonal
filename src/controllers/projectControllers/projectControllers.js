const { User, Skill, Technology, Project } = require("../../db");

const getProjectsController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }
  const user = await User.findByPk(id, {
    include: [
      {
        model: Project,
      },
    ],
  });

  if (!user) {
    return { error: true, message: "No existe el usuario" };
  }
  const projects = await user.getProjects();
  return { data: projects, message: "Proyectos encontrados", error: false };
};

const editProjectController = async (
  id,
  title,
  description,
  url,
  image,
  startDate,
  endDate,
  skills,
  technologies
) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }

  const project = await Project.findByPk(id);

  if (!project) {
    return { error: true, message: "No existe el proyecto" };
  }

  if (title || description || url || image || startDate || endDate) {
    const projectData = {};
    title && (projectData.title = title);
    description && (projectData.description = description);
    url && (projectData.url = url);
    image && (projectData.image = image);
    startDate && (projectData.startDate = startDate);
    endDate && (projectData.endDate = endDate);

    await project.update(projectData);
  }

  const [user] = await project.getUsers();

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
      const projectsPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return project.addSkill(skill);
      });

      await Promise.all(projectsPromises);

      const userPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return user.addSkill(skill);
      });

      await Promise.all(userPromises);
    }

    const totalSkills = await project.getSkills();
    const promises = totalSkills.map((skill) => {
      if (!skills.find((s) => s.name === skill.name)) {
        return project.removeSkill(skill);
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
      const projectsPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return project.addTechnology(technology);
      });

      await Promise.all(projectsPromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }
  }
};

const createProjectsController = async (
  id,
  title,
  description,
  url,
  image,
  startDate,
  endDate,
  skills,
  technologies
) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }

  const user = await User.findByPk(id);

  if (!user) {
    return { error: true, message: "No existe el usuario" };
  }

  if (!title || !description) {
    return { error: true, message: "Faltan datos" };
  }

  const projectData = { title, description };
  url && (projectData.url = url);
  image && (projectData.image = image);
  startDate && (projectData.startDate = startDate);
  endDate && (projectData.endDate = endDate);

  const project = await user.createProject(projectData);

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
      const projectsPromises = skillsToAdd.map((response) => {
        const [skill] = response;
        return project.addSkill(skill);
      });

      await Promise.all(projectsPromises);

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
      const projectsPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return project.addTechnology(technology);
      });

      await Promise.all(projectsPromises);

      const userPromises = technologiesToAdd.map((response) => {
        const [technology] = response;
        return user.addTechnology(technology);
      });

      await Promise.all(userPromises);
    }
  }
  return { data: project, error: false, message: "Proyecto creado" };
};

const deleteProjectController = async (id) => {
  if (!id) {
    return { error: true, message: "Falta el id" };
  }

  const project = await Project.findByPk(id);

  if (!project) {
    return { error: true, message: "No existe el proyecto" };
  }

  await project.destroy();

  return { error: false, message: "Proyecto eliminado" };
};

module.exports = {
  getProjectsController,
  editProjectController,
  createProjectsController,
  deleteProjectController,
};
