const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const Catch = require('../models/catch');
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
    return await Catch.findAll({
        where: { user_id: userid },
        attributes: ['catch_id', 'catch_location_x', 'catch_location_y', 'catch_date'],
        include: [{
            model: Pokemon, 
            attributes: ['poke_id', 'poke_name', 'poke_image'],
            required: true,
        }],
    }).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
        httpMsgs.throwErr(err);
    })
}

exports.deleteCatch = async (catchId, userId) => {
    await Catch.destroy(
        { where: { catch_id: catchId, user_id: userId }}
    ).then(() => {
        return "Success"
    }).catch((err) => {
        return `Error occurred: ${err}`
    })
}