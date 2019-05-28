const validator = require('../helpers/validators/user');
const userServices = require('../services/user');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');

exports.register = async (req, res) => {
    let isValid = validator.validateUser(req.body.user);
    const userExists = await validator.checkUserExists(req.body.user);
    
    if (isValid) {
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
    else {
        let err = "Missing data";
        httpMsgs.show400(req, res, err);
    }
    
} 

exports.activate = (req, res) => {
    const {email, hash} = req.body;
    userServices.activateUser(email, hash, res)
}

exports.login = (req, res) => {
    const {username, password} = req.body.user;
    userServices.logIn(username, password, res)
}

exports.getUsers = (req, res) => {
    userServices.getUsers(req, res);
}