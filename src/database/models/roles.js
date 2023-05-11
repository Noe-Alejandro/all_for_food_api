const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * Roles: Modelo que representa la entidad de la base de datos para los roles
 * 
 * @property { INTEGER } id : el número identificador del rol
 * @property { STRING } rol : el nombre del rol
 */
const Roles = sequelize.define("permission",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "roles",
    tableName: "roles",
    timestamps: false
});

module.exports = Roles;