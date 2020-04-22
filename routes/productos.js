var express = require('express');
var router = express.Router();

const productosController = require('./../controllers/productos');

router.get('/', productosController.productos);

router.get('/nuevo', productosController.agregarComentario);
router.post('/nuevo', productosController.nuevoProductoPost);

router.get('/editar/:id', productosController.editarProducto);
router.post('/editar', productosController.editarProductoPost);

router.get('/ver/:id', productosController.verProducto);


module.exports = router;