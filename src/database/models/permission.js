const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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