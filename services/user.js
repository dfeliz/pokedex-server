const User = require('../models/user');
const Gender = require('../models/gender');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');
const crypto = require('crypto');
const nodemailer = require('../helpers/nodemailer/nodemailer'); 
const jsonwebtoken = require('../services/jwt');

exports.registerUser = async (req) => {
    const today = new Date();
    const {user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture, gender_id} = req;
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
        gender_id: gender_id,
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
        .then(async (quantity) => {
            if (quantity === 1) {
                await User.findOne({ where: {user_username : username }})
                    .then((response) => {
                        if (response.user_active === true) {
                            let token = jsonwebtoken.newToken(username);
                            let data = {
                                token,
                                username
                            }
                            httpMsgs.success(res, data);
                        }
                        else {
                            let err = "Account is inactive";
                            httpMsgs.throwErr(res, err);
                        }
                    })
                    .catch((err) => {
                        console.log("err " + err);
                    })
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
    let hash = crypto.randomBytes(20).toString('hex'); //TODO: Create with JWT and make it expire in 30 min
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
                httpMsgs.throwErr(res, err);
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

exports.getUserID = async ( user_username ) => {
    return await User.findOne({
        where: { user_username },
        attributes: ['user_id']
    })
    .then((user) => {
        return (user.get('user_id'));
    })
    .catch((err) => {
        console.log('error getting user id: ' + err);
        throw err;
    })
}

exports.getProfile = async (user) => {
    return await User.findAll({
        where: {user_username: user},
        attributes: ['user_name', 'user_lastname', 'user_birthdate', 'user_city', 'user_email', 'user_username', 'createdAt'],
        include: [{
            model: Gender,
            attributes: ['gender_name'],
            required: true,
        }]
    }).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    })
}

exports.updateProfile = async (user, data) => {
    return await User.update(
        {
            user_name: data.user_name,
            user_lastname: data.user_lastname,
            user_birthdate: data.user_birthdate,
            user_city: data.user_city,
            // user_email: data.user_email,
            gender_id: data.gender_id,
        },
        { where: { user_username: user }},
    ).catch((err) => {
        throw err;
    })
}