const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * Permission: Modelo que representa la entidad de la base de datos para los permisos que puede
 *  tener un usuario
 * @property {INTEGER} id : id de la tupla
 * @property {INTEGER} userId: id del usuario
 * @property {INTEGER} rolId : id del rol que le pertenece al usuario
 */
const Permission = sequelize.define("permission",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rolId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "permission",
    tableName: "permission",
    timestamps: false
});

module.exports = Permission;