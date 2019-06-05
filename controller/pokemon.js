const pokemonServices = require('../services/pokemon');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');

exports.getPokemonList = async (req, res) => {
    let data = await pokemonServices.getPokemonList(req, res);
    httpMsgs.success(res, data);
}