const { comentario } = require('../models/Comentario.js');

let controller = {};


controller.comentarios = (req, res, next) => {

    (async() => {
        try {
            let comentarios = await Comentario.findAll();
            //Primer parámetro: archivo a mostrar como html
            // - Omitir /views/ al inicio
            // - Omitir .ejs al final
            //Segundo parámetro: objeto con variables para la vista
            res.render('comentarios/lista', {
                titulo: 'comentarios',
                comentarios: comentarios
            });

        } catch (err) {
            console.error('Error en la consulta de comentarios', err);
            res.render('comentarios/lista', {
                titulo: 'comentarios',
                comentarios: []
            });
        }

    })();

};


controller.agregarComentario = (req, res, next) => {
    (async() => {
        try {
            let id = req.body.id;
            let url = req.body.url;
            let nombre = req.body.nombre;
            let comentario = req.body.comentario;

            //Crear objeto con estructura de modelo
            let foto = {
                url: url,
                nombre: nombre,
                comentario: comentario,

                //Relación con el producto al que corresponde
                productoId: id
            }

            await Foto.create(foto);

            res.redirect('/detalle/' + id);
        } catch (err) {

        }
    })();
};



controller.nuevocomentarioPost = (req, res, next) => {
    (async() => {
        try {
            //La información de un formulario viene desde req.body

            //Extraer valores de formulario
            let comentarios = req.body.comentarios;

            //TODO: Validar valores

            //Objeto con la estructura del modelo
            let comentarioACrear = {
                comentarios: comentarios,


            };

            await comentario.create(comentarioACrear);

            //Redireccionar a una URL
            res.redirect('/');
        } catch (err) {
            console.error('Error al crear comentario', err);
            res.render('comentarios/formulario');
        }
    })();
};

controller.editarcomentario = (req, res, next) => {
    (async() => {
        try {


            //Extraer id desde url
            let id = req.params.id;

            //Buscar por id
            let comentario = await comentario.findByPk(id);

            //Buscar por otros campos
            // let comentario = await comentario.findByOne({
            //     where: {
            //         nombre: 'Mochila'
            //     }
            // });

            res.render('comentarios/formulario', {
                id: comentario.id,
                comentarios: comentario.comentarios,


            });
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};

controller.editarcomentarioPost = (req, res, next) => {
    (async() => {
        try {
            let id = req.body.id;
            let comentarios = req.body.comentarios;


            //TODO: validar campos

            let comentario = await comentario.findByPk(id);

            comentario.comentarios = comentarios;


            await comentario.save();

            res.redirect('/');
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};




module.exports = controller;