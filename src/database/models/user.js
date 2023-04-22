const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
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