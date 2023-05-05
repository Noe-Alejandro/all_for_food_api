const User = require('../database/models/user');
const Permission = require('../database/models/permission');
const Roles = require('../database/models/roles');

const authUser = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    });
    if (!user) {
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

    console.log(user.dataValues);

    return JSON.parse(JSON.stringify(user, null, 2));
}

const authToken = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });
    if (user) {
        return JSON.parse(JSON.stringify(user, null, 2));
    }
}

module.exports = { authUser, authToken };