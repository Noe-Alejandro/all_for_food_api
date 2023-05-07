const Ingredient = require('../database/models/ingredient');

const postIngredient = (req) => {
    return Ingredient.create({
        id: req.id,
        name: req.name
    }).then(ingredient => {
        return ingredient;
    })
}

const getAllIngredient = async (pagination) => {
    const amount = await Ingredient.count();

    return Ingredient.findAll(pagination.options, {
        where: {
            status: 1
        }
    }).then(ingredients => {
        return JSON.parse(JSON.stringify({ data: ingredients, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
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