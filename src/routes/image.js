const router = require('express').Router();
const upload = require('../controllers/image');
const { findAll } = require('../controllers/product')


router.post('/upload', upload.single('file'), findAll );

module.exports = router;