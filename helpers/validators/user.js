const User = require('../../models/user');

exports.checkUserExists = async (data) => {
    let count;
    await User.count({ where: {user_username: data.user_username }})
        .then((quantity) => {
            count = quantity;
        }).catch((err) => {
            console.log(err);
        })
    if (count >= 1) {
        console.log("Existe, no insertar")
        return true;
    }
    console.log("No existe, insertar")
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