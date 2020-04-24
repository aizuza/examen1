// Importar librería Sequelize
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Importar conexión a base de datos
const { sequelize } = require('./../config/db');

// Crear modelo
class Comentario extends Model {}
Comentario.init({
    //Definir campos del modelo

    comentario: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'comentario'
});

// Exportar modelo
module.exports = { Comentario };