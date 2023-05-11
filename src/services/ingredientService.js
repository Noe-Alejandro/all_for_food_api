const Ingredient = require('../database/models/ingredient');
const RecipeIngredient = require("../database/models/recipeIngredient");
const postIngredient = (req) => {
    return Ingredient.create({
        id: req.id,
        name: req.name
    }).then(ingredient => {
        return ingredient;
    })
}

const getAllIngredient = async (pagination) => {
    return Ingredient.findAndCountAll(pagination.options, {
        where: {
            status: 1
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    }).then(ingredients => {
        return JSON.parse(JSON.stringify({ data: ingredients.rows, totalPage: Math.ceil(ingredients.count / pagination.header.size) }, null, 2));
    });
}

const getIngredientById = (ingredientId) => {
    return Ingredient.findOne({
        where: {
            id: ingredientId
        }
    }
    ).then(ingredient => {
        return JSON.parse(JSON.stringify(ingredient, null, 2));
    })
};

const deleteIngredient = async (id) => {
    await RecipeIngredient.destroy({
        where: {
            ingredientId: id
        }
    });
    return Ingredient.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

module.exports = { postIngredient, getAllIngredient, getIngredientById, deleteIngredient };