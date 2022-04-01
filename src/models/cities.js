const sql = require("./dbConnectionModel");


//Constructor

const Ciudad = function(ciudad) {
    this.id = ciudad.id;
    this.id_product = ciudad.id_product;
    this.id_city = ciudad.id_city;
}


Ciudad.getByIdProduct = (id_product) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT ps_product_cities.id, ps_product_cities.id_product, ps_product_cities.id_city, ps_cities.nombre, ps_cities.latitud, ps_cities.longitud FROM ps_product_cities INNER JOIN ps_cities ON ps_product_cities.id_city = ps_cities.id WHERE ps_product_cities.id_product = ?", [id_product], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        });
    }); 
}

Ciudad.create = (ciudadProductoNuevo, result) => {
    sql.query("INSERT INTO ps_product_cities SET ?", ciudadProductoNuevo, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { ciudadProductoNuevo });
    });
}

Ciudad.remove = (idProducto, result) => {
    sql.query(`DELETE FROM ps_product_cities WHERE id_product = ${idProducto}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "No_Encontrado" }, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Ciudad;
