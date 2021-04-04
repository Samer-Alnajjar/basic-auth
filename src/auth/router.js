"use strict"

const express = require("express");
const router = express.Router();
const basicAuth = require("./middleware/basic.js");
const userFunctions = require("../controllers/users.js");



// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', userFunctions.signup);


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth , userFunctions.signin);


module.exports = router;