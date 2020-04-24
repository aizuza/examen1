let controller = {};

const { Comentario } = require('./../models/comentarios');




controller.agregarComentario = (req, res, next) => {
    (async() => {
        try {




            let id = req.params.id;


            //este pasa el id hacia el formulario
            res.render('productos/comentario', {
                id: id,
            });



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


controller.verComentarioPost = (req, res, next) => {
    (async() => {
        try {

            //Obtener información desde un formulario (body)
            // console.log('req.body', req.body);

            //Extraer variables desde el body
            let comentario = req.body.comentario;
            let nombre = req.body.nombre;
            let id = req.body.id;


            //Revisar errores
            let errors = {};

            if (!comentario || comentario === '') {
                errors.comentario = 'Por favor introduce un comentario';
                //return para finalizar función
                // return res.render('productos/formulario', {
                //     mensajeErrorNombre: 'Por favor introduce un nombre',
                //     nombre: nombre,
                //     precio: precio,
                // });
            }






            // Crear un objeto con estructura del modelo
            let comentarioACrear = {
                comentario: comentario,
                nombre: nombre,
                productoId: id

            };

            // Guardar (crear registro) en base de datos
            let comentarioCreado = await Comentario.create(comentarioACrear);

            // Redireccionar a una URL
            res.redirect('/');
        } catch (err) {
            console.error('Error en la consulta', err);

            // Redireccionar a una URL
            res.render('productos/comentarios');
        }
    })();
};

module.exports = controller;