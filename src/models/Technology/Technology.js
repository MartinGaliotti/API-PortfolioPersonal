const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Technology",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
