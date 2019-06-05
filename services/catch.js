const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const Catch = require('../models/catch');

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