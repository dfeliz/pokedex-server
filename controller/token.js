const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const jwtServices = require('../services/jwt');

exports.checkLoggedIn = (req, res) => {
    const {token} = req.body;
    if (token) {
        jwtServices.renewToken(res, token);
    }
    else {
        let err = "Must pass a token";
        httpMsgs.show401(res, err);
    }
}