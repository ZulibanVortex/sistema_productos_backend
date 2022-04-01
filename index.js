'use strict'

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('http').Server(app);
const morgan = require('morgan');
const configServe = require('./src/config/config')
const PORT = configServe().port;

const routes = require('./src/routes/index');


app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(morgan('dev'))



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
        // respond with 200
        res.sendStatus(200)
    } else {
        // move on
        next()
    }
})

app.use('/public', express.static(`${__dirname}/uploads`));
// Ruta simple
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: "Bienvenido Backend Sistema Productos"
    });
});

app.use('/', routes);


http.listen(PORT, async function () {
})