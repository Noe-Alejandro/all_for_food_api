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

const deleteIngredient = async (id) => {
    const ingredientEntity = await Ingredient.findOne({
        where: {
            id: id
        }
    });
    if (!ingredientEntity) {
        return null;
    }

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

module.exports = { postIngredient, getAllIngredient, deleteIngredient };