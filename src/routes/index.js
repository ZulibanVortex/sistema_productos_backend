const router = require('express').Router();

const usuariosRouter = require('./user');
const productosRouter = require('./product');
const citiesRouter = require('./cities');
const cityRoutes = require('./city');

router.use('/usuarios', usuariosRouter);
router.use('/productos', productosRouter);
router.use('/cities', citiesRouter);
router.use('/city', cityRoutes);

module.exports = router;

