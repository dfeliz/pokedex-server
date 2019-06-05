const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const catchServices = require('../services/catch');
const userServices = require('../services/user');
const tokenServices = require('../services/jwt');
const pokemonServices = require('../services/pokemon');

exports.createCatch = async (req, res) => {
    const { 
        catch_location_x, 
        catch_location_y, 
        catch_date, 
        poke_id, 
        user_username 
    } = req.body;

    const user_id = await userServices.getUserID(user_username);

    const data = {
        catch_location_x,
        catch_location_y,
        catch_date,
        user_id,
        poke_id,
    }
    await catchServices.createCatch(res, data)
        .then(() => {
            httpMsgs.success(res);
        })
        .catch((err) => {
            console.log(err);
            httpMsgs.throwErr(err);
        })
}

exports.getCatches = async (req, res) => {
    let token = req.headers.authorization;
    let user = await tokenServices.checkToken(res, token);
    if (user) {
        const userid = await userServices.getUserID(user);
        const catches = await catchServices.getCatches(userid);
        let pokemons = [];
        catches.map((item) => {
            pokemons.push(item.poke_id);
        });
        // const pokemonData = await pokemonServices.getPokemonsInfo(pokemons);
        // let data = [];

        // httpMsgs.success(res, data);
    }
}  