const express = require('express');

// controller functions improted 
const { signup,login  } = require('../controllers/user');

const router = express.Router();

router.post('/SignUp', signup);
router.post('/Login', login);

module.exports = router;




