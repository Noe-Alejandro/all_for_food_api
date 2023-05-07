const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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