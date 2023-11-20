const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/index.js"); // Reemplaza './database' con la ruta a tu configuración de Sequelize

const Localizacion = sequelize.define(
  "localizacion",
  {
    municipio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8), 
      allowNull: false,
      validate: {
        min: -90, 
        max: 90, 
      },
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8), 
      validate: {
        min: -180, 
        max: 180, 
    },
  },
}, 
  {
    timestamps: false,
  }
);

module.exports = Localizacion;
