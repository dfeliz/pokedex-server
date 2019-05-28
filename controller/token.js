const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const jwtServices = require('../services/jwt');

exports.checkLoggedIn = (req, res) => {
    const {username, token} = req.body;
    if (token) {
        jwtServices.verifyToken(res, username, token);
    }
    else {
        let err = "Must pass a token";
        httpMsgs.throwErr(res, err);
    }
}