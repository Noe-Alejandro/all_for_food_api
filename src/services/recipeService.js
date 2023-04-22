const Recipe = require('../database/models/recipe');

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
        modifiedAt: Date.now()
    }).then(recipe => {
        return recipe;
    })
}

/**
 * 
 * @param {number} lim : the number of recipes to be returned.
 * @returns all recipes in DB.
 */
const getAllRecipe = () => {
    return Recipe.findAll().then(recipes => {
        return JSON.parse(JSON.stringify(recipes, null, 2));
    });
}

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to find.
 * @returns the recipe asociated to the recipeId
 */
const getRecipeById = (recipeId => {
    return Recipe.findByPk(recipeId).then(recipe => {
        return JSON.parse(JSON.stringify(recipe, null, 2));
    })
});

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to update.
 * @param {*} req : Body of the row to be updated
 * @returns the updated recipe
 */
const updateRecipe = async (recipeId, req) => {
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
        return null;
    }

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
}

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to deactivate/delete.
 */
const deleteRecipe = (recipeId => {
    Recipe.update({ status: 0 }, {
        where: {
            recipeId: recipeId
        }
    })
})

module.exports = { postRecipe, getAllRecipe, getRecipeById, updateRecipe };