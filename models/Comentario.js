//Importar librería Sequelize
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

const Model = Sequelize.Model;
class Comentario extends Model {}
Comentario.init({
    // attributes
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comentario: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comentario'
        // options
});

//Exportar modelo
module.exports = { Comentario };