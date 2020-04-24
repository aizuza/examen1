let controller = {};

const { Producto } = require('./../models/producto');
const { Foto } = require('./../models/foto');



controller.productos = (req, res, next) => {

    // (1)

    // Consultar todos los productos
    Producto.findAll()
        // Manejar resultado de consulta
        .then((productos) => {
            // (3)

            //Renderizar una vista (HTML / EJS)
            //- Nombre de la vista (se omite "views/" al inicio, y se omite ".ejs" al final)
            //- Variables para la vista
            res.render('productos/productos', {
                titulo: 'Lista de productos',
                productos: productos,
            });
        })
        //En caso de error en la consulta
        .catch((err) => {
            console.error('Error en la consulta', err);

            res.render('productos/productos', {
                titulo: 'Lista de productos',
                productos: [],
            });
        });

    // (2)
};

controller.productosVersionFacil = (req, res, next) => {
    (async() => {
        try {
            let productos = await Producto.findAll();

            res.render('productos/productos', {
                titulo: 'Lista de productos',
                productos: productos,
            });
        } catch (err) {
            console.error('Error en la consulta', err);

            res.render('productos/productos', {
                titulo: 'Lista de productos',
                productos: [],
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

            //Obtener información desde un formulario (body)
            // console.log('req.body', req.body);

            //Extraer variables desde el body
            let nombre = req.body.nombre;
            let precio = req.body.precio;

            //Revisar errores
            let errors = {};

            if (!nombre || nombre === '') {
                errors.nombre = 'Por favor introduce un nombre';
                //return para finalizar función
                // return res.render('productos/formulario', {
                //     mensajeErrorNombre: 'Por favor introduce un nombre',
                //     nombre: nombre,
                //     precio: precio,
                // });
            }


            if (!precio || precio === '') {
                errors.precio = 'Por favor introduce un precio';
                // return res.render('productos/formulario', {
                //     mensajeErrorPrecio: 'Por favor introduce un precio',
                //     nombre: nombre,
                //     precio: precio,
                // });
            }

            //En caso de error, renderizar vista nuevamente con mensajes de error
            if (errors.nombre || errors.precio) {
                return res.render('productos/formulario', {
                    errors: errors,
                    nombre: nombre,
                    precio: precio,
                });
            }

            // Crear un objeto con estructura del modelo
            let productoACrear = {
                nombre: nombre,
                precio: precio
            };

            // Guardar (crear registro) en base de datos
            let productoCreado = await Producto.create(productoACrear);

            // Redireccionar a una URL
            res.redirect('/');
        } catch (err) {
            console.error('Error en la consulta', err);

            // Redireccionar a una URL
            res.render('productos/formulario');
        }
    })();
};

controller.editarProducto = (req, res, next) => {
    (async() => {
        try {
            //Parámetros de una url indicados con dos puntos (:)
            console.log('req.params', req.params);

            //Extraer parámetro de la url
            let id = req.params.id;

            // Consultar producto por su Primary Key (campo id)
            let producto = await Producto.findByPk(id);

            // (Alternativa) consultar producto por un campo
            // let producto = await Producto.findOne({
            //     where: {
            //         id: id
            //     }
            // });

            res.render('productos/formulario', {
                id: id,
                nombre: producto.nombre,
                precio: producto.precio,
            });
        } catch (err) {
            //TODO: manejar caso de error
        }
    })();
};

controller.editarProductoPost = (req, res, next) => {
    (async() => {
        try {
            //Información desde formulario viene desde req.body

            //Extraer campos desde req.body
            let id = req.body.id;
            let nombre = req.body.nombre;
            let precio = req.body.precio;

            //Revisar errores
            let errors = {};

            if (!nombre || nombre === '') {
                errors.nombre = 'Por favor introduce un nombre';
            }


            if (!precio || precio === '') {
                errors.precio = 'Por favor introduce un precio';
            }

            //En caso de error, renderizar vista nuevamente con mensajes de error
            if (errors.nombre || errors.precio) {
                return res.render('productos/formulario', {
                    errors: errors,
                    id: id,
                    nombre: nombre,
                    precio: precio,
                });
            }

            //Consultar registro existente en base de datos
            let productoAModificar = await Producto.findByPk(id);

            //Actualizar campos
            productoAModificar.nombre = nombre;
            productoAModificar.precio = precio;

            //Guardar cambios en base de datos
            await productoAModificar.save();

            //Redireccionar a una URL
            res.redirect('/');

        } catch (err) {

        }
    })();
};

controller.borrarProducto = (req, res, next) => {
    (async() => {
        try {
            let id = req.params.id;

            await Producto.destroy({
                where: {
                    id: id
                }
            });

            res.redirect('/');
        } catch (err) {

        }
    })();
};

controller.detalleProducto = (req, res, next) => {
    (async() => {
        try {
            let id = req.params.id;

            let producto = await Producto.findByPk(id);

            let fotos = await producto.getFotos();

            res.render('productos/detalle', {
                producto: producto,
                fotos: fotos
            });

        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('productos/detalle', {
                producto: {},
                fotos: []
            });
        }
    })();
};

controller.agregarFoto = (req, res, next) => {
    (async() => {
        try {
            let id = req.body.id;
            let url = req.body.url;
            let nombre = req.body.nombre;
            let descripcion = req.body.descripcion;

            //Crear objeto con estructura de modelo
            let foto = {
                url: url,
                nombre: nombre,
                descripcion: descripcion,

                //Relación con el producto al que corresponde
                productoId: id
            }

            await Foto.create(foto);

            res.redirect('/detalle/' + id);
        } catch (err) {

        }
    })();
};

module.exports = controller;