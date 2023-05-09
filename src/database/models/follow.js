const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Follow = sequelize.define("follows",
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
        followId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "follows",
    tableName: "follows",
    timestamps: false
});

module.exports = Follow;