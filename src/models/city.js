const sql = require("./dbConnectionModel");


//Constructor

const City = function(city) {
    this.nombre = city.nombre;
    this.latitud = city.latitud;
    this.longitud = city.longitud
}


City.getAll = result => {
    sql.query('SELECT * FROM ps_cities', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
}


module.exports = City;
