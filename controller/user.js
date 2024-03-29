const validator = require('../helpers/validators/user');
const userServices = require('../services/user');
const tokenServices = require('../services/jwt');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');

exports.register = async (req, res) => {
    let isValid = validator.validateUser(req.body.user);
    const userExists = await validator.checkUserExists(req.body.user);
    
    if (isValid) {
        if (userExists === true) {
            let err = "Username already exists in database";
            httpMsgs.throwErr(res, err);
        } 
        else {
            const emailExists = await validator.checkEmailExists(req.body.user);
            if (emailExists === true) {
                let err = "Email already exists in database";
                httpMsgs.throwErr(res, err);
            } 
            if (userExists === false && emailExists === false) {
                console.log("Usuario no existe y email no existe, registrando usuario")
                try {
                    await userServices.registerUser(req.body.user);
                    httpMsgs.success(res);
                }
                catch (err) {
                    httpMsgs.show500(res, err);
                }
            }
        }    
    }
    else {
        let err = "Missing data";
        httpMsgs.show400(res, err);
    }
    
} 

exports.activate = (req, res) => {
    const {email, hash} = req.body;
    userServices.activateUser(email, hash, res);
}

exports.login = (req, res) => {
    const {username, password} = req.body.user;
    userServices.logIn(username, password, res);
}

exports.forgotPassword = (req, res) => {
    const {email} = req.body;
    userServices.forgotPassword(email, res);
}

exports.checkResetPassword = async (req, res) => {
    const {email, hash} = req.body;
    let userValid = await userServices.checkEmailAndHash(email, hash);
    if (userValid === true) {
        httpMsgs.success(res);
    }
    else {
        let err = "User not valid";
        httpMsgs.throwErr(res, err);
    }
}

exports.resetPassword = async (req, res) => {
    const {email, newPassword} = req.body;
    try {
        let response = await userServices.resetPassword(email, newPassword);
        if (response === "Success") {
            httpMsgs.success(res);
        }
        else {
            httpMsgs.throwErr(res, response);
        }
    }
    catch (err) {
        httpMsgs.throwErr(res, err);
    }
}

exports.getProfile = async (req, res) => {
    let token = req.headers.authorization;
    let user = await tokenServices.checkToken(res, token);
    if (user) {
        try {
            let data = await userServices.getProfile(user);
            httpMsgs.success(res, data);
        }
        catch (err) {
            console.log(err);
            httpMsgs.throwErr(res, err);
        }
    }
}

exports.updateProfile = async (req, res) => {
    let token = req.headers.authorization;
    let user = await tokenServices.checkToken(res, token);
    if (user) {
        let data = req.body;
        try {
            await userServices.updateProfile(user, data)
            httpMsgs.success(res);
        }
        catch (err) {
            httpMsgs.throwErr(res, err);
        }
    }
}
