const { Producto } = require('../models/Producto');
const { Comentario } = require('../models/Comentario')
let controller = {};


controller.productos = (req, res, next) => {

    (async() => {
        try {
            let productos = await Producto.findAll();
            //Primer parámetro: archivo a mostrar como html
            // - Omitir /views/ al inicio
            // - Omitir .ejs al final
            //Segundo parámetro: objeto con variables para la vista
            res.render('productos/lista', {
                titulo: 'Productos',
                productos: productos
            });

        } catch (err) {
            console.error('Error en la consulta de productos', err);
            res.render('productos/lista', {
                titulo: 'Productos',
                productos: []
            });
        }

    })();

};

controller.nuevoProducto = (req, res, next) => {
    res.render('productos/formulario');
};

controller.nuevoProductoPost = (req, res, next) => {
    (async() => {
        try {
            //La información de un formulario viene desde req.body

            //Extraer valores de formulario
            let nombre = req.body.nombre;
            let precio = req.body.precio;

            //TODO: Validar valores

            //Objeto con la estructura del modelo
            let productoACrear = {
                nombre: nombre,
                precio: precio,

            };

            await Producto.create(productoACrear);

            //Redireccionar a una URL
            res.redirect('/');
        } catch (err) {
            console.error('Error al crear producto', err);
            res.render('productos/formulario');
        }
    })();
};

controller.editarProducto = (req, res, next) => {
    (async() => {
        try {


            //Extraer id desde url
            let id = req.params.id;

            //Buscar por id
            let producto = await Producto.findByPk(id);

            //Buscar por otros campos
            // let producto = await Producto.findByOne({
            //     where: {
            //         nombre: 'Mochila'
            //     }
            // });

            res.render('productos/formulario', {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,

            });
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};

controller.editarProductoPost = (req, res, next) => {
    (async() => {
        try {
            let id = req.body.id;
            let nombre = req.body.nombre;
            let precio = req.body.precio;

            //TODO: validar campos

            let producto = await Producto.findByPk(id);

            producto.nombre = nombre;
            producto.precio = precio;

            await producto.save();

            res.redirect('/');
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};


controller.verProducto = (req, res, next) => {
    (async() => {
        try {


            //Extraer id desde url
            let id = req.params.id;

            //Buscar por id
            let producto = await Producto.findByPk(id, {
                include: [Comentario]
            });

            //Buscar por otros campos
            // let producto = await Producto.findByOne({
            //     where: {
            //         nombre: 'Mochila'
            //     }
            // });

            res.render('productos/verproducto', {
                id: producto.id,
                nombre: producto.nombre,

                comentarios: producto.comentarios,

            });
        } catch (err) {
            //TODO: manejar catch
        }
    })();
};

module.exports = controller;