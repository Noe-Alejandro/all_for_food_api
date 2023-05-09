const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Recipe = require('./recipe');

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

Favorite.belongsTo(User);
Favorite.belongsTo(Recipe);

module.exports = Favorite;