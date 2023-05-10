const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const RecipeIngredient = sequelize.define("recipe_ingredient",
    {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "recipe_ingredient",
    tableName: "recipe_ingredient",
    timestamps: false
});

module.exports = RecipeIngredient;