const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
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
