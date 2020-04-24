const { Producto } = require('./../models/producto');
const { Foto } = require('./../models/foto');
const { Comentario } = require('./../models/comentarios');

Producto.hasMany(Foto);
Foto.belongsTo(Producto);
Producto.hasMany(Comentario);
Comentario.belongsTo(Producto);