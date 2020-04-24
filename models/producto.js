// Importar librería Sequelize
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Importar conexión a base de datos
const { sequelize } = require('./../config/db');

// Crear modelo
class Producto extends Model {}
Producto.init({
    //Definir campos del modelo
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'producto'
});

// Exportar modelo
module.exports = { Producto };