const User = require('../models/user');
const httpMsgs = require('../helpers/httpMsgs');
const crypto = require('crypto');
const nodemailer = require('../helpers/nodemailer/nodemailer');

exports.registerUser = (req, res) => {
    const today = new Date();
    const {user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture} = req;
    try {
        let hash = crypto.randomBytes(20).toString('hex');

        User.create({
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
        httpMsgs.success(req, res);
        nodemailer.sendmail(user_email, hash);
    }
    catch (err) {
        httpMsgs.show500(req, res, err);
    }
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