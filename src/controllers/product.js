const Producto = require('../models/product');
const Ciudad = require('../models/cities');
const multer = require('multer');



module.exports.findAll = async function(req, res) {
    Producto.getAll(async (err, productos) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando productos',
                errors: err
            });
        } else {
            for (let i = 0; i < productos.length; i++) {
                let product_id = productos[i].id;
                let ciudades = await Ciudad.getByIdProduct(product_id);
                productos[i].ciudades = ciudades;
            }
            res.status(200).json({
                ok: true,
                productos
            });
        }
    });
}

module.exports.findOne = async function(req, res) {
    const id = req.params.productId;
    Producto.findById(id, (err, productDb) => {
        if (err) {
            if (err.kind === "No_Encontrado") {
                return res.status(404).json({
                    ok: false,
                    mensaje: `Producto no encontrado con id: ${id}.`,
                    errors: err
                });
            } else {
                return res.status(500).json({
                    ok: true,
                    mensaje: "Error al recuperar producto con id: " + id,
                    errors: { message: "Error al recuperar producto de la base de datos" }
                });
            }
        }
        res.status(200).json({
            ok: true,
            producto: productDb
        });
    });
}

exports.suppress = (req, res) => {
    const id = req.params.productId;
    Producto.remove(id, (err, productoBorrado) => {
        if (err) {
            if (err.kind === "No_Encontrado") {
                return res.status(400).json({
                    ok: false,
                    mensaje: `prodcuto no encontrado con id ${id}`,
                    errors: { message: 'No existe un producto con ese ID' }
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al borrar el producto",
                    errors: err
                });
            }
        } else {
            res.status(200).json({
                ok: true,
                mensaje: `El producto fue eliminado exitosamente`,
            });
        }
    });
}
exports.create = (req, res) => {
    const { nombre, precio, cantidad, observaciones } = req.body;
    const product = new Producto ({
        nombre,
        precio,
        cantidad,
        observaciones,
        imagen: ''
    });
    Producto.create(product, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                idProducto: data.id,
            });
        }
    });
}

 exports.update = (req, res) => {
    const id = req.params.productId;
    const { nombre, precio, cantidad, observaciones } = req.body;
    const productUpdate = new Producto ({
        nombre,
        precio, 
        cantidad,
        observaciones
    });
    Producto.updateById(
        id,
        productUpdate,
        (err, productoGuardado) => {
            if (err) {
                if (err.kind === "No_Encontrado") {
                    return res.status(400).send({
                        ok: false,
                        mensaje: `producto no encontrado con el id: ${id}.`,
                        errors: { message: 'No existe un producto con ese Id' }
                     });
                } else {
                     return res.status(500).send({
                        ok: false,
                        message: "Error al retornar producto con el id: " + id,
                        errors: err
                    });
                }
            }
            res.status(200).json({
                ok: true,
                producto: productoGuardado
            });

        }
    );
 };
