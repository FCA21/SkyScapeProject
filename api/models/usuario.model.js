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

  password: {
    type: DataTypes.STRING,
    allowNull: false,

  },

  rol: {
    type: DataTypes.ENUM('usuario', 'admin'),
    defaultValue: 'usuario'
  }
},  

  {
    timestamps: false,
  
});

module.exports = Usuario