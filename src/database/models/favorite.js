const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define("favorites",
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
        }
    }, {
    sequelize,
    modelName: "favorites",
    tableName: "favorites",
    timestamps: false
});

module.exports = Favorite;