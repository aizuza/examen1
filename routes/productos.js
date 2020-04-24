var express = require('express');
var router = express.Router();

let productosController = require('./../controllers/productos');

router.get('/', productosController.productos);
router.get('/facil', productosController.productosVersionFacil);
router.get('/nuevo', productosController.nuevoProducto);
router.post('/nuevo', productosController.nuevoProductoPost);

router.get('/editar/:id', productosController.editarProducto);
router.post('/editar', productosController.editarProductoPost);

router.get('/borrar/:id', productosController.borrarProducto);

router.get('/detalle/:id', productosController.detalleProducto);

router.post('/agregarfoto', productosController.agregarFoto);

module.exports = router;