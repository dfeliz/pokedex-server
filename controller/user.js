const validator = require('../helpers/validators/user');
const userServices = require('../services/user');
const httpMsgs = require('../helpers/httpMsgs');

exports.register = async (req, res, next) => {
    const userExists = await validator.checkUserExists(req.body.user);
    if (userExists === true) {
        let err = "Username already exists in database";
        httpMsgs.show409(req, res, err);
    } 
    else {
        const emailExists = await validator.checkEmailExists(req.body.user);
        if (emailExists === true) {
            let err = "Email already exists in database";
            httpMsgs.show409(req, res, err);
        } 
        if (userExists === false && emailExists === false) {
            console.log("Usuario no existe y email no existe, registrando usuario")
            userServices.registerUser(req.body.user, res);
        }
    }
    
} 

exports.activate = (req, res, next) => {

}

exports.login = (req, res, next) => {

}

exports.getUsers = (req, res, next) => {
    userServices.getUsers(req, res);
}