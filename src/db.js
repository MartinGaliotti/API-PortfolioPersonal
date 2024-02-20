require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_URL } = process.env;

//Models import
//Experience
const ExperienceModel = require("./models/Experience/Experience");
//Education
const EducationModel = require("./models/Education/Education");
//General
const AddressModel = require("./models/General/Address");
//Project
const ProjectModel = require("./models/Project/Project");
//Skill
const SkillModel = require("./models/Skill/Skill");
//Technology
const TechnologyModel = require("./models/Technology/Technology");
//User
const UserModel = require("./models/User/User");
const CredentialsModel = require("./models/User/Credentials");
const ContactInfoModel = require("./models/User/ContactInfo");

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});

ExperienceModel(sequelize);
EducationModel(sequelize);
AddressModel(sequelize);
ProjectModel(sequelize);
SkillModel(sequelize);
TechnologyModel(sequelize);
UserModel(sequelize);
CredentialsModel(sequelize);
ContactInfoModel(sequelize);

const {
  Experience,
  Education,
  Address,
  Project,
  Skill,
  Technology,
  User,
  Credentials,
  ContactInfo,
} = sequelize.models;

Address.hasOne(User);
User.belongsTo(Address);

User.hasOne(Credentials);
Credentials.belongsTo(User);

User.hasMany(ContactInfo);
ContactInfo.belongsTo(User);

User.belongsToMany(Technology, { through: "UserTechnology" });
Technology.belongsToMany(User, { through: "UserTechnology" });

User.belongsToMany(Skill, { through: "UserSkill" });
Skill.belongsToMany(User, { through: "UserSkill" });

User.belongsToMany(Project, { through: "UserProject" });
Project.belongsToMany(User, { through: "UserProject" });

User.belongsToMany(Experience, { through: "UserExperience" });
Experience.belongsToMany(User, { through: "UserExperience" });

User.belongsToMany(Education, { through: "UserEducation" });
Education.belongsToMany(User, { through: "UserEducation" });

Project.belongsToMany(Technology, { through: "ProjectTechnology" });
Technology.belongsToMany(Project, { through: "ProjectTechnology" });

Project.belongsToMany(Skill, { through: "ProjectSkill" });
Skill.belongsToMany(Project, { through: "ProjectSkill" });

Experience.belongsToMany(Technology, { through: "ExperienceTechnology" });
Technology.belongsToMany(Experience, { through: "ExperienceTechnology" });

Address.hasOne(Experience);
Experience.belongsTo(Address);

Experience.belongsToMany(Skill, { through: "ExperienceSkill" });
Skill.belongsToMany(Experience, { through: "ExperienceSkill" });

Education.belongsToMany(Technology, { through: "EducationTechnology" });
Technology.belongsToMany(Education, { through: "EducationTechnology" });

Address.hasOne(Education);
Education.belongsTo(Address);

Education.belongsToMany(Skill, { through: "EducationSkill" });
Skill.belongsToMany(Education, { through: "EducationSkill" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
