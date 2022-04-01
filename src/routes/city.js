const router = require('express').Router();
const { findAll } = require('../controllers/city');


router.get('/list', findAll);

module.exports = router;