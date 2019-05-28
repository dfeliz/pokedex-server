const User = require('../models/user');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const crypto = require('crypto');
const nodemailer = require('../helpers/nodemailer/nodemailer'); 
const jsonwebtoken = require('../services/jwt');

exports.registerUser = async (req, res) => {
    const today = new Date();
    const {user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture} = req;
    try {
        let hash = crypto.randomBytes(20).toString('hex');

        await nodemailer.sendmail(user_email, hash);
        await User.create({
            user_name: user_name.trim,
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
        httpMsgs.success(req, res);
    }
    catch (err) {
        httpMsgs.show500(req, res, err);
    }
}

exports.activateUser = async (email, hash, res) => {
    await User.count({ where: {user_email: email, user_hash: hash}})
        .then(async (quantity) => {
            if (quantity === 1) {
                await User.update(
                    {user_active: 1, user_hash: null},
                    {where: {user_email: email, user_hash: hash} }
                ).then((data) => {
                    httpMsgs.success(null, res, data);
                }).catch(() => {
                    let err = "Could not activate user";
                    httpMsgs.show400(null, res, err)
                })
            }
            else {
                let err = "User not found"
                httpMsgs.show400(null, res, err);
            }
        })
        .catch((err) => {
            httpMsgs.show500(null, res, err);
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
                httpMsgs.success(null, res, data);
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

exports.getUsers = async (req, res) => {
    try {
        let data = await User.findAll();
        httpMsgs.success(req, res, data);
    }
    catch (err) {
        httpMsgs.show500(req, res, err);
    }
}