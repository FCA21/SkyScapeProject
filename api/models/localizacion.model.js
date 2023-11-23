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
      type: DataTypes.STRING, 
      allowNull: false, 
      },
    longitud: {
      type: DataTypes.STRING, 
      allowNull: false
    },
}, 
  {
    timestamps: false,
  }
);

module.exports = Localizacion;
