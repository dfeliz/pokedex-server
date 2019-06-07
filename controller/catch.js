const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const catchServices = require('../services/catch');
const userServices = require('../services/user');
const tokenServices = require('../services/jwt');

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
        httpMsgs.success(res, catches);
    }
}  

exports.deleteCatch = async (req, res) => {
    let token = req.headers.authorization;
    let user = await tokenServices.checkToken(res, token);
    if (user) {
        const userId = await userServices.getUserID(user);
        let catchId = parseFloat(req.params.id);
        await catchServices.deleteCatch(catchId, userId)
            .then(() => {
                httpMsgs.success(res);
            })
            .catch((err) => {
                httpMsgs.throwErr(res, err);
            })
    }
}