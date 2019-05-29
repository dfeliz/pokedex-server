const User = require('../../models/user');

exports.validateUser = (data) => {
    if (data.user_name && data.user_lastname && data.user_birthdate && data.user_city && data.user_email && data.user_username && data.user_password) {
        return true;
    }
    return false;
}

exports.checkUserExists = async (data) => {
    let count;
    await User.count({ where: {user_username: data.user_username }})
        .then((quantity) => {
            count = quantity;
        }).catch((err) => {
            console.log(err);
        })
    if (count >= 1) {
        return true;
    }
    return false;
    }

exports.checkEmailExists = async (data) => {
    let count;
    await User.count({ where: {user_email: data.user_email }})
        .then((quantity) => {
            count = quantity;
        }).catch((err) => {
            console.log(err);
        })
    if (count >= 1) {
        return true;
    }
    return false;
    }