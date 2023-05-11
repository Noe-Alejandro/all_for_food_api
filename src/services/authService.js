const User = require('../database/models/user');
const Permission = require('../database/models/permission');
const Roles = require('../database/models/roles');
const bcrypt = require("bcryptjs");

const authUser = async (email, password) => {

    const user = await User.findOne({
        where: {
            email: email,
            status: 1
        }
    });
    if (!user) {
        return null;
    }
    
    var isValidate = await new Promise(function(resolve, reject) {
        bcrypt.compare(password, user.dataValues.password, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });

    if(!isValidate){
        return null;
    }

    const permission = await Permission.findOne({
        where: {
            userId: user.dataValues.id
        }
    });

    const rol = await Roles.findOne({
        where: {
            id: permission.rolId
        }
    });

    user.dataValues.permission = rol.dataValues.rol;

    return JSON.parse(JSON.stringify(user, null, 2));
}

const authToken = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });

    const permission = await Permission.findOne({
        where: {
            userId: user.dataValues.id
        }
    });

    const rol = await Roles.findOne({
        where: {
            id: permission.rolId
        }
    });

    user.dataValues.permission = rol.dataValues.rol;

    if (user) {
        return JSON.parse(JSON.stringify(user, null, 2));
    }
}

module.exports = { authUser, authToken };