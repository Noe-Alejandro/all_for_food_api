const { response } = require('express');
const User = require('../database/models/user');
const Permission = require('../database/models/permission');
const bcrypt = require("bcryptjs");
const { GetUserResponse } = require('../models/responses/user/getUser');

const getAllUser = (id) => {
    return User.findAll({
        where: {
            id: id
        }
    }).then(users => {
        if (users.length == 0) {
            return null;
        }
        return JSON.parse(JSON.stringify(new GetUserResponse(users[0]), null, 2));
    });
}

const getAllUserForAdmin = async (status, pagination) => {
    const amount = await User.count({
        where: {
            status: status
        }
    });

    return User.findAll({
        where: {
            status: status
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    }).then(users => {
        if (users.length == 0) {
            return null;
        }
        return JSON.parse(JSON.stringify({ data: users, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
}

const postUser = async (req) => {
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
        return Permission.create({
            userId: user.dataValues.id,
            rolId: 1
        }).then(permission => {
            user.dataValues.permission = "User"
            return user;
        });
    });
};

const putUser = async (id, req) => {
    const userEntity = await User.findOne({
        where: {
            id: id
        }
    });

    if (!userEntity) {
        return null;
    }

    if (!req.password) {
        value = {
            username: req.username,
            email: req.email,
            icon: req.icon,
            description: req.description,
            modifiedAt: Date.now()
        }
    } else {
        value = {
            username: req.username,
            email: req.email,
            password: await bcrypt.hash(req.password, 10),
            icon: req.icon,
            description: req.description,
            modifiedAt: Date.now()
        }
    }


    return User.update(
        value,
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

const validateEmailExist = async (email) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        return null;
    }
    return user.dataValues;
}



module.exports = { getAllUser, getAllUserForAdmin, postUser, putUser, deleteUser, reactiveUser, validateEmailExist };