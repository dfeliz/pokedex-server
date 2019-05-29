const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const tokenController = require('../controller/token')

// User
// Register
router.post('/user/register', userController.register);
// Login
router.post('/user/login', userController.login);
// Activate
router.post('/user/activate', userController.activate);
// ForgotPassword
router.post('/user/forgotpassword', userController.forgotPassword)

// User GET
router.get('/users', userController.getUsers);

// JWT
// Verify token
router.post('/token/verify', tokenController.checkLoggedIn)



module.exports = router;
