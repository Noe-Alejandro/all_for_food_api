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

module.exports = { getAllUser };