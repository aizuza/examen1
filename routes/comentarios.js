var express = require('express');
var router = express.Router();

const comentariosController = require('./../controllers/comentarios');

router.get('/', comentariosController.Comentarios);

router.get('/nuevo', comentariosController.agregarComentario);
router.post('/nuevo', comentariosController.nuevoComentariosPost);

router.get('/editar/:id', comentariosController.editarComentarios);
router.post('/editar', comentariosController.editarComentariosPost);

module.exports = router;