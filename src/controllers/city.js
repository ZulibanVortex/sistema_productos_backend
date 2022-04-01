const City = require('../models/city');



module.exports.findAll = async function(req, res) {
    City.getAll(async (err, cities) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando ciudades',
                errors: err
            });
        } else {
            res.status(200).json({
                ok: true,
                ciudades: cities
            });
        }
    });
}
