const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * RecipeIngredient: Modelo que representa la relación m-n en la base de datos entre Recipe e Ingredient.
 * Conecta una receta con sus ingredientes asociados
 * 
 * @property { INTEGER } recipeId : el identificador de la receta 
 * @property { INTEGER } ingredientId : el identificador del ingrediente
 * 
 * Belongs to: User
 * Belongs to Many: Ingredients
 */
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