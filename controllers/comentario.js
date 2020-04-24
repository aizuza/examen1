let controller = {};

const { Comentario } = require('./../models/comentario');




controller.agregarComentario = (req, res, next) => {
    (async() => {
        try {




            let id = req.body.id;
            let nombre = req.body.nombre;
            let comentario = req.body.comentario;


            //Crear objeto con estructura de modelo
            let comentario = {

                nombre: nombre,
                comentario: comentario,

                //Relación con el producto al que corresponde
                productoId: id
            }

            await Comentario.create(comentario);

            res.redirect('/detalle/' + id);
        } catch (err) {

        }
    })();
};

module.exports = controller;