const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/index.js'); 

const Usuario_Actividad = sequelize.define('usuario_actividad', 
{
    fecha_actividad: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

module.exports = Usuario_Actividad;
