var express = require('express');
var router = express.Router();

let comentariosController = require('./../controllers/comentario');

router.get('/comentario/:id', comentariosController.agregarComentario);

module.exports = router;