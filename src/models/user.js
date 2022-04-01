const sql = require("./dbConnectionModel");




// Constructor
const Usuario = function(usuario) {
    this.email = usuario.email;
    this.password = usuario.password;
}


Usuario.create = (usuarioNuevo, result) => {
    sql.query("INSERT INTO ps_users SET ?", usuarioNuevo, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...usuarioNuevo });
    });
};



Usuario.getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM ps_users WHERE email = ?", [email], (err, rows) => {
            if (err) reject(err)
            resolve(rows[0])
        });
    });
}

module.exports = Usuario;