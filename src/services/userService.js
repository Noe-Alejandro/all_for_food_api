const { response } = require('express');
const User = require('../database/models/user');
const bcrypt = require("bcryptjs");

const getAllUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    }).then(users => {
        return JSON.parse(JSON.stringify(users, null, 2));
    });
}

const postUser = async(req) => {
    return User.create({
        username: req.username,
        email: req.email,
        password: await bcrypt.hash(req.password, 10),
        icon: req.icon,
        description: req.description,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        status: 1,
    }).then(user => {
        return user;
    });
};

const putUser = async(id, req) => {
    const userEntity = await User.findOne({
        where: {
            id: id
        }
    });

    if (!userEntity) {
        return null;
    }

    return User.update(
        {
            username: req.username,
            email: req.email,
            password: await bcrypt.hash(req.password, 10),
            icon: req.icon,
            description: req.description,
            modifiedAt: Date.now()
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            return result[0]
        }
        );
}

const deleteUser = async (id) => {
    const userEntity = await User.findOne({
        where: {
            id: id
        }
    });

    if (!userEntity) {
        return null;
    }

    return User.update(
        {
            status: 0,
            modifiedAt: Date.now()
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

const reactiveUser = async (id) => {
    const userEntity = await User.findOne({
        where: {
            id: id
        }
    });

    if (!userEntity) {
        return null;
    }

    return User.update(
        {
            status: 1,
            modifiedAt: Date.now()
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}



module.exports = { getAllUser, postUser, putUser, deleteUser, reactiveUser };