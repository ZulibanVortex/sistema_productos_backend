const router = require('express').Router();
const { findAll, findOne, suppress, create, update, upload} = require('../controllers/product');


router.get('/list', findAll);
router.get('/view/:productId', findOne);
router.delete('/delete/:productId', suppress);
router.post('/register', create);
router.put('/update/:productId', update);
router.post('/upload/:productId', upload);


module.exports = router;