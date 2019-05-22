const connection = require('../core/connection');
const User = require('../models/user');
const validator = require('../helpers/validator');

exports.register = (req, res, next) => {
    const today = new Date();
    console.log(req.body.user);
    const { user_name, user_lastname, user_birthdate, user_city, user_email, user_username, user_password, user_picture} = req.body.user
    let isValid = validator.validateUser(req.body.user);
    if (isValid) {
        User.create({ //service
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
        }).then(() => {
            res.writeHead(200, "Success", {"content-type": "application/json"});
        }).catch((err) => {
            res.writeHead(400, "Error", {"content-type": "application/json"})
            res.json(err);
        })
    }
    else {
        res.writeHead(400, "Null values", {"content-type": "application/json"});
    }
    res.end();
    
} 

exports.login = (req, res, next) => {

}

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err); 
            res.status(404).send(err);
        })
}