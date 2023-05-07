const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Permissions = require('./permission');

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