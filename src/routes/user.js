const router = require('express').Router();
const { auth, create } = require('../controllers/user');


router.post('/auth', auth);
router.post('/register', create);

module.exports = router;