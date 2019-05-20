var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET users
router.get('/api/users', function(req, res, next) {
    res.send('respond with a resource');
    console.log('hi');
});

// GET pokemons
router.get('/api/pokemons', function(req, res, next) {
    res.send('list of pokemons');
})

// GET pokemon types
router.get('/api/pokemons/types', function(req, res, next) {
    res.send('Pokemon types')
})

// GET catches
router.get('/api/catches', function(req, res, next) {
    res.send('Here be the catches');
})

module.exports = router;
