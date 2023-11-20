const { sequelize } = require('../../database/index.js')
const { DataTypes } = require('sequelize')

const Usuario = sequelize.define("usuario", 
{
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type:DataTypes.INTEGER
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  clave: {
    type: DataTypes.STRING
  },

  role: {
    type: DataTypes.ENUM('usuario', 'admin'),
    defaultValue: 'usuario'
  }
},  

  {
    timestamps: false,
  
});

module.exports = Usuario