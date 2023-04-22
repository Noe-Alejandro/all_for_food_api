const { response } = require('express');
const User = require('../database/models/user');

const getAllUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    }).then(users => {
        return JSON.parse(JSON.stringify(users, null, 2));
    });
}

const postUser= (req) => {
    return User.create({
        username: req.username,
        email: req.email,
        password: req.password,
        icon: req.icon,
        description: req.description,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        status: 1,
    }).then(user => {
        return user;
    });
};


module.exports = { getAllUser, postUser };