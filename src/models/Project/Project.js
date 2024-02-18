const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Project", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    finishDate: {
      type: DataTypes.DATEONLY,
    },
  });
};
