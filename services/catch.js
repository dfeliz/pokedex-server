const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const Catch = require('../models/catch');
const User = require('../models/user');
const Pokemon = require('../models/pokemon');

exports.createCatch = async (res, data) => {
    const { catch_location_x, catch_location_y, catch_date, poke_id, user_id } = data;
    
    await Catch.create({
        catch_location_x,
        catch_location_y,
        catch_date,
        user_id,
        poke_id,
    })
    .catch((err) => {
        httpMsgs.throwErr(res, err);
    })
}

exports.getCatches = async (userid) => {
    const response = await Catch.findAll({
        where: { user_id: userid }
    });
    let data = [];
    response.map((item) => {
        data.push(item);
    })
    return data;
}