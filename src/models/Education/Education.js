const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Education",
    {
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
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
    }
  );
};
