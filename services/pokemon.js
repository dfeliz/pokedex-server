const Pokemon = require('../models/pokemon');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');

exports.getPokemonList = async (req, res) => {
    try {
        let data = await Pokemon.findAll();
        let array = [];
        data.map((item) => {
            array.push({
                poke_id: item.poke_id,
                poke_name: item.poke_name,
            })
        })
        return array;
    }
    catch (err) {
        console.log(err);
        httpMsgs.throwErr(res, err);
    }
}