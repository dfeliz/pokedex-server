const validator = require('../helpers/validator');
const userServices = require('../services/user');
const httpMsgs = require('../helpers/httpMsgs');

exports.register = (req, res, next) => {
    let isValid = validator.validateUser(req.body.user);
    if (isValid) {
        userServices.registerUser(req.body.user, res);
    }
    else {
        let err = "Missing data";
        httpMsgs.show400(req, res, err);
    }    
} 

exports.login = (req, res, next) => {

}

exports.getUsers = (req, res, next) => {
    userServices.getUsers(req, res);
}