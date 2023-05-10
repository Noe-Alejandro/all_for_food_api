const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Score = sequelize.define("scores",
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
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
    sequelize,
    modelName: "scores",
    tableName: "scores",
    timestamps: false
});

module.exports = Score;