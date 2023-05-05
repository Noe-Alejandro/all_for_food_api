const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');
const { GetRecipeResponse } = require('../models/responses/recipe/getRecipe');

/**
 * 
 * @param {*} req : body of the row to be created
 * @returns recipe
 */
const postRecipe = (req) => {
    return Recipe.create({
        userId: req.userId,
        title: req.title,
        image: req.image,
        description: req.description,
        steps: req.steps,
        rate: req.rate,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        status: 1
    }).then(recipe => {
        return recipe;
    })
};


const getAllRecipe = async (pagination) => {
    const amount = await Recipe.count();

    return Recipe.findAll({
        where: {
            status: 1
        }
    }, pagination.options
    ).then(recipes => {
        return JSON.parse(JSON.stringify({ data: recipes, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
};

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to find.
 * @returns the recipe asociated to the recipeId if it's activated
 */
const getRecipeById = async (recipeId, status = 1) => {
    var recipe = await Recipe.findOne({
        where: {
            id: recipeId,
            status: status
        }
    });
    console.log(recipe.dataValues);
    if (!recipe) {
        return null;
    }

    var user = await User.findOne({
        where: {
            id: recipe.dataValues.userId
        }
    });

    return new GetRecipeResponse(recipe.dataValues, user.dataValues);
};

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to update.
 * @param {*} req : Body of the row to be updated
 * @returns the updated recipe
 */
const updateRecipe = async (recipeId, req) => {
    return Recipe.update(
        {
            title: req.title,
            image: req.image,
            description: req.description,
            steps: req.steps,
            modifiedAt: Date.now()
        }, {
        where: {
            id: recipeId
        }
    }).then(res => {
        return res[0]
    });
};

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to deactivate/delete.
 */
const deleteRecipe = async (recipeId) => {
    return Recipe.update({ status: 0 }, {
        where: {
            id: recipeId,
            status: 1
        }
    }).then(result => {
        return result
    });
};

const reactivateRecipe = async (recipeId) => {
    return Recipe.update({ status: 1 }, {
        where: {
            id: recipeId,
            status: 0
        }
    }).then(result => {
        return result
    });
}

module.exports = { postRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe, reactivateRecipe };