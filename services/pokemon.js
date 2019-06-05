const Pokemon = require('../models/pokemon');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

exports.getPokemonsInfo = async (IdArray) => {
    let results = await Pokemon.findAll({
        where: {
            poke_id: {
                [Op.or]: IdArray
            }
        }
    })
    return results;
}