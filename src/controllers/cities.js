const Ciudad = require('../models/cities');


exports.listProduct = (async (req, res) => {
    const id_product = req.params.productId;;
    const cities = await Ciudad.getByIdProduct(id_product);
    if (cities.length === 0) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error cargando ciudades del producto',
            errors: err
        });
    } else {
        res.status(200).json({
            ok: true,
            ciudades: cities
        });
    }

});
exports.create = (req, res) => {
    const { id_product, id_city } = req.body;
    const ciudad = new Ciudad ({
         id_product,
         id_city
    });
    Ciudad.create(ciudad, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                ciudad,
            });
        }
    });
}
exports.suppress = (req, res) => {
    const id = req.params.productId;
    Ciudad.remove(id, (err, ciudadBorrada) => {
        if (err) {
            if (err.kind === "No_Encontrado") {
                return res.status(400).json({
                    ok: false,
                    mensaje: `ciudades no encontrada con idProducto ${id}`,
                    errors: { message: 'No existen ciudades con ese ID' }
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al borrar la ciudad",
                    errors: err
                });
            }
        } else {
            res.status(200).json({
                ok: true,
                mensaje: `La ciudad fue eliminado exitosamente`,
            });
        }
    });
}