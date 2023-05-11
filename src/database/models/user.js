const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Permissions = require('./permission');

/**
 * User: Modelo de la base de datos que define a los usuarios
 * 
 * @property { INTEGER } id : el número identificador de la tupla de usuario
 * @property { STRING } username : el monbre del usuario
 * @property { STRING } email : el correo del usuario
 * @property { TEXT } password : la contraseña del usuario
 * @property { TEXT } icon : el url de la imagen de perfil del usuario
 * @property { STRING } description : descripción del perfil del usuario
 * @property {DATE} createdAt : la fecha en la que se creó el usuario
 * @property {DATE} modifiedAt : la fecha en la que se modificó el perfil del usuario
 * @property {TINYINT} status : valor de estatus del usuario 1 = activado, 0 = desactivado
 */
const User = sequelize.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        icon: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        modifiedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    }, {
    sequelize,
    modelName: "user",
    tableName: "user",
    timestamps: false
});


module.exports = User;