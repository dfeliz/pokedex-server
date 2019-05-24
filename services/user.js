const User = require('../models/user');
const httpMsgs = require('../helpers/httpMsgs');

exports.registerUser = (req, res) => {
    const today = new Date();
    const {user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture} = req;
    try {
        User.create({
            user_name: user_name,
            user_lastname: user_lastname,
            user_birthdate: user_birthdate,
            user_city: user_city,
            user_email: user_email,
            user_username: user_username,
            user_password: user_password,
            user_picture: user_picture,
            createdAt: today,
            updatedAt: today,
        })
        httpMsgs.success(req, res);
        // send email
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