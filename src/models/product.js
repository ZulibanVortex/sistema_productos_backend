const sql = require("./dbConnectionModel");


//Constructor

const Producto = function(producto) {
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.cantidad = producto.cantidad;
    this.observaciones = producto.observaciones;
    this.imagen = producto.imagen;
}


Producto.getAll = result => {
    sql.query('SELECT * FROM ps_products', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    })
}

Producto.findById = (productId, result) => {
    sql.query(`SELECT * FROM ps_products WHERE id = ${productId}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
        // producto no encontrado con el id
        result({ kind: "No_Encontrado" }, null);
    });
}

Producto.remove = (id, result) => {
    sql.query(`DELETE FROM ps_products WHERE id = ${id}`, (err, res) => {
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

Producto.create = (productoNuevo, result) => {
    sql.query("INSERT INTO ps_products SET ?", productoNuevo, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...productoNuevo });
    });
}

Producto.updateById = (idProducto, producto, result) => {
    sql.query(
        "UPDATE ps_products SET nombre = ?, precio = ?, cantidad = ?, observaciones = ? WHERE id = ?", [producto.nombre, producto.precio, producto.cantidad, producto.observaciones, idProducto],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "No_Encontrado" }, null);
                return;
            }

            result(null, { id: idProducto, ...producto });
        }
    );
};

Producto.updateImageById = (idProducto, nameImage, result) => {
    sql.query(
        "UPDATE ps_products SET imagen = ? WHERE id = ?", [nameImage, idProducto],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "No_Encontrado" }, null);
                return;
            }

            result(null, { id: idProducto, imagen: nameImage });
        }
    );
};


module.exports = Producto;
