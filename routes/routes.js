const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const tokenController = require('../controller/token');
const pokemonController = require('../controller/pokemon');
const catchController = require('../controller/catch');

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/activate', userController.activate);
router.post('/user/forgotpassword', userController.forgotPassword)
router.post('/user/checkresetpassword', userController.checkResetPassword);
router.post('/user/resetpassword', userController.resetPassword);
router.get('/user/profile', userController.getProfile);
router.post('/user/profile/update', userController.updateProfile);
router.get('/pokemon', pokemonController.getPokemonList) // Get all pokemons
router.post('/catch', catchController.createCatch) // Create a catch item
router.get('/user/catches', catchController.getCatches) // Get user's pokemon list
router.delete('/user/catches/:id', catchController.deleteCatch)
router.post('/token/verify', tokenController.checkLoggedIn)



module.exports = router;
