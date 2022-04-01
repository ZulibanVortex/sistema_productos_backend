const Usuario = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const configServe = require('../config/config')
const SEED = configServe().secretEncript;



exports.create = (req, res) => {

    const { email, password } = req.body;

    const usuario = new Usuario ({
        email,
        password: bcrypt.hashSync(password, 10),
    });

    Usuario.create(usuario, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "El correo debe ser único",
                errors: err
            });
        } else {
            res.status(201).json({
                ok: true,
                usuario: usuario,
                usuariotoke: req.usuario
            });
        }
    });
}

module.exports.auth = async function auth(req, res) {
    const { email, password } = req.body;
    const UsuarioDB = await Usuario.getByEmail(email)
    if (UsuarioDB === undefined) {
        return res.status(400).json({
            ok: false,
            errors: "Error Correo Incorrecto",
        });
    } else {
        const equals = bcrypt.compareSync(password, UsuarioDB.password);
        if (!equals) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error password incorrecto',
            });
        } else {
            UsuarioDB.password = ":)";

            const token = jwt.sign({ usuario: UsuarioDB }, SEED, { expiresIn: 14400 }) //4horas

            res.json({
                ok: true,
                usuario: UsuarioDB,
                token: token
            });
        }
    }
}