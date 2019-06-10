const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const Catch = require('../models/catch');
const Pokemon = require('../models/pokemon');
const {paginate} = require('../helpers/paginator/paginator');

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

exports.getCatches = async (userid, page, pageSize, orderBy) => {
    const obj = {
        az: [Pokemon, 'poke_name', 'ASC'],
        datenewest: ['catch_date', 'DESC'],
        dateoldest: ['catch_date', 'ASC'],
        id: ['catch_id', 'ASC']
    };
    const order = obj[orderBy] !== undefined ? obj[orderBy] : obj['id'];

    return await Catch.findAll(
        paginate ({
        where: { user_id: userid },
        order: [order],
        attributes: ['catch_id', 'catch_location_x', 'catch_location_y', 'catch_date'],
        include: [{
            model: Pokemon, 
            attributes: ['poke_id', 'poke_name', 'poke_image'],
            required: true,
        }],
    }, { page: page, pageSize: pageSize }
    )).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    })
}

exports.countCatches = async (userId) => {
    return await Catch.count({
        where: { user_id: userId }
    }).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });
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