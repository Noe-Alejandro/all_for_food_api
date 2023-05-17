const User = require('../database/models/user');
const Permission = require('../database/models/permission');
const Roles = require('../database/models/roles');
const bcrypt = require("bcryptjs");

/**
 * Autentifica al usuario checando el email y contraseña ingresados con lo guardado en la DB
 * 
 * @param {*} email : coreo del usuario 
 * @param {*} password : contraseña del usuario 
 * @returns {Object | null} : Regresa el usuario si la autenticación es exitosa y null si no lo fue
 */
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

/**
 * Genera un token de autentificación con el Id ingresado
 * @param {*} id : el id del usuario
 * @returns  {Object | undefined} : el usuario con el token generado o indefinido si no se encuentra al usuario
 */
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