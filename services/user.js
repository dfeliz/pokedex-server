const User = require('../models/user');

exports.registerUser = (data) => {
    try {
        User.create({ // service
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
    }
    catch (err) {
        res.writeHead(400, "Error", {"content-type": "application/json"})
        res.json(err);
    }
    
    
    
    .then(() => {
        res.writeHead(200, "Success", {"content-type": "application/json"});
    }).catch((err) => {
        
    })
}

exports.getUsers = () => {
    User.findAll()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err); 
            res.status(404).send(err);
        })
}