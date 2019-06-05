const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const catchServices = require('../services/catch');
const userServices = require('../services/user');

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