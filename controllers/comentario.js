let controller = {};

const { Comentario } = require('./../models/comentarios');




controller.agregarComentario = (req, res, next) => {
    (async() => {
        try {




            let id = req.body.id;

            let comentario = req.body.comentario;


            //Crear objeto con estructura de modelo
            let comentarioObject = {


                comentario: comentario,

                //Relación con el producto al que corresponde
                productoId: id
            }

            await Comentario.create(comentarioObject);

            res.redirect('/detalle/' + id);



        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('productos/comentario', {
                nombre: {},
                comentario: {},
                producto: {}
            });
        }
    })();
};

module.exports = controller;