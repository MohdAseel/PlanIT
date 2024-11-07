const express = require('express');
const {signupUser,loginUser} = require('../controller/user-controller.js');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');


const router = express.Router();

router.post('/signup', signupValidation, signupUser );
router.post('/login', loginValidation, loginUser);


module.exports = router;