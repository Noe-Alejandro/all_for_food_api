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
        modifiedAt: Date.now(),
        status: 1
    }).then(recipe => {
        return recipe;
    })
}


const getAllRecipe = async (pagination) => {
    const amount = await Recipe.count();

    return Recipe.findAll( pagination.options, {
        where: {
            status: 1
        }
    }).then(recipes => {
        return JSON.parse(JSON.stringify({data: recipes, totalPage: Math.ceil(amount / pagination.header.size)}, null, 2));
    });
}

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to find.
 * @returns the recipe asociated to the recipeId if it's activated
 */
const getRecipeById = (recipeId => {
    return Recipe.findOne({
        where: {
            recipeId: recipeId,
            status: 1
        }
    }
    ).then(recipe => {
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
    const recipe = await Recipe.findOne({
        where:{
            recipeId: recipeId,
            status: 1
        }
    });
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
};

/**
 * 
 * @param {number} recipeId : Identification number of the recipe to deactivate/delete.
 */
const deleteRecipe = async (recipeId) => {
    const recipe = await Recipe.findOne({
        where:{
            recipeId: recipeId,
            status: 1
        }
    });

    if (!recipe) {
        return null;
    }

    Recipe.update({ status: 0 }, {
        where: {
            recipeId: recipeId
        }
    }).then(result => {
        return result
    });
};

const reactivateRecipe = async (recipeId) => {
    const recipe = await Recipe.findOne({
        where:{
            recipeId: recipeId,
            status: 0
        }
    });

    if (!recipe) {
        return null;
    }

    Recipe.update({ status: 1 }, {
        where: {
            recipeId: recipeId
        }
    }).then(result => {
        return result
    });
}

module.exports = { postRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe, reactivateRecipe };