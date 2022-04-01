const router = require('express').Router();
const { listProduct, create, suppress} = require('../controllers/cities');


router.get('/list/:productId', listProduct);
router.post('/register', create);
router.delete('/delete/:productId', suppress);


module.exports = router;