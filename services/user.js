const User = require('../models/user');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const crypto = require('crypto');
const nodemailer = require('../helpers/nodemailer/nodemailer'); 
const jsonwebtoken = require('../services/jwt');

exports.registerUser = async (req) => {
    const today = new Date();
    const {user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture} = req;
    let hash = crypto.randomBytes(20).toString('hex');
    await User.create({
        user_name: user_name,
        user_lastname: user_lastname,
        user_birthdate: user_birthdate,
        user_city: user_city,
        user_email: user_email,
        user_username: user_username,
        user_password: crypto.createHash('md5').update(user_password).digest('hex'),
        user_picture: user_picture,
        user_hash: hash,
        createdAt: today,
        updatedAt: today,
    })
    await nodemailer.sendActivation(user_email, hash);
}

exports.activateUser = async (email, hash, res) => {
    await User.count({ where: {user_email: email, user_hash: hash}})
        .then(async (quantity) => {
            if (quantity === 1) {
                await User.update(
                    {user_active: 1, user_hash: null},
                    {where: {user_email: email, user_hash: hash} }
                ).then((data) => {
                    httpMsgs.success(res, data);
                }).catch(() => {
                    let err = "Could not activate user";
                    httpMsgs.show400(res, err)
                })
            }
            else {
                let err = "User not found"
                httpMsgs.show400(res, err);
            }
        })
        .catch((err) => {
            httpMsgs.show500(res, err);
        })
}

exports.logIn = async(username, password, res) => {
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex')
    await User.count({ where: {user_username: username, user_password: hashedPassword}})
        .then((quantity) => {
            if (quantity === 1) {
                let token = jsonwebtoken.newToken(username);
                let data = {
                    token,
                    username
                }
                httpMsgs.success(res, data);
            }
            else {
                let err = "User not found"
                httpMsgs.throwErr(res, err);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getUsers = async (res) => {
    try {
        let data = await User.findAll();
        httpMsgs.success(res, data);
    }
    catch (err) {
        httpMsgs.show500(res, err);
    }
}

exports.forgotPassword = async (email, res) => {
    let hash = crypto.randomBytes(20).toString('hex');
    await User.count({ where: {user_email: email }})
        .then(async (quantity) => {
            if (quantity === 1) {
                nodemailer.sendPasswordReset(email, hash);
                await User.update(
                    {user_hash: hash},
                    {where: {user_email: email} }
                ).then((data) => {
                    httpMsgs.success(res, data);
                }).catch(() => {
                    let err = "Could not set password forgot token";
                    httpMsgs.show400(res, err)
                })
            }
            else {
                let err = "Email not found";
                httpMsgs.throwErr(err);
            }
        })
        .catch ((err) => {
            httpMsgs.show500(res, err);
        });
}

exports.checkEmailAndHash = async (email, hash) => {
    let quantity = await User.count({ where: {user_email: email, user_hash: hash}})
    if (quantity === 1) {
        return true;
    }
    else  {
        return false;
    }
}

exports.resetPassword = async (email, newPassword) => {
    let hashedPassword = crypto.createHash('md5').update(newPassword).digest('hex');
    await User.update(
        { user_password: hashedPassword, user_hash: null },
        { where: { user_email: email }}
    ).then(() => {
        return "Success";
    }).catch((error) => {
        return error;
    })
}