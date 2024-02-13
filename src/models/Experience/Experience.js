const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Experience", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
