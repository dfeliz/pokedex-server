const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const tokenController = require('../controller/token')

/////////////////////// User/////////////////////
// Public
// Register
router.post('/user/register', userController.register);
// Login
router.post('/user/login', userController.login);
// Activate
router.post('/user/activate', userController.activate);
// ForgotPassword
router.post('/user/forgotpassword', userController.forgotPassword)
// ResetPassword
router.post('/user/checkresetpassword', userController.checkResetPassword);
router.post('/user/resetpassword', userController.resetPassword);

// Private
// Profile
// router.get('/user/profile', userController.getProfile);
// router.get('/user/info', userController.getInfo)


////////////////////// Token ////////////////////
// JWT
// Verify token
router.post('/token/verify', tokenController.checkLoggedIn)



module.exports = router;
