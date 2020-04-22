//Importar librería Sequelize
const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

const Model = Sequelize.Model;
class Producto extends Model {}
Producto.init({
    // attributes
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'producto'
        // options
});

//Exportar modelo
module.exports = { Producto };