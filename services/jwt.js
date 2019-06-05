const jwt = require('jsonwebtoken');
const validator = require('../helpers/validators/user');
const httpMsgs = require('../helpers/httpMsgs/httpMsgs');

const SECRET_KEY = 'password';

exports.newToken = (username) => {
    const tokenData = {
        username: username
    }

    const token = jwt.sign(tokenData, SECRET_KEY, {
        expiresIn: 60*60*24
    })
    
    return token;
}

exports.renewToken = async (res, token) => {
    let user = jwt.verify(token, SECRET_KEY, (err, token) => {
        if (err) {
            throw err;
        }
        return token.username;
    });
    
    let data = {
        user_username: user,
    }

    let userExists = await validator.checkUserExists(data);

    if (userExists) {
        token = this.newToken(user);
        data = {
            username: user,
            token: token,
        }
        httpMsgs.success(res, data);
    }
}

exports.checkToken = async (res, token) => {
    try {
        let user = await jwt.verify(token, SECRET_KEY);
        return user.username;
    }
    catch (error) {
        console.log(error);
        let err = 'Unauthorized';
        httpMsgs.show401(res, err);
    }
};