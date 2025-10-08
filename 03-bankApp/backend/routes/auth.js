const express = require('express');
const { signup, Signin, verifyAuthentication, signOut } = require("../controller/auth.js");
const { validateSignUpInput, validateSignInInput, verifyToken } = require('../middleware/auth.js');

const router  = express.Router();


router.post('/signup', validateSignUpInput, signup);
router.post('/signin', validateSignInInput, Signin);
router.get("/verify", verifyToken, verifyAuthentication);
router.get("/signout", signOut);

module.exports = {authRouter: router};
