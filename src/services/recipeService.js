const Ingredient = require('../database/models/ingredient');
const Recipe = require('../database/models/recipe');
const RecipeIngredient = require('../database/models/recipeIngredient');
const User = require('../database/models/user');
const Follow = require('../database/models/follow');

const { GetRecipeResponse, MapListRecipes } = require('../models/responses/recipe/getRecipe');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Método POST de la receta
 * 
 * @param {*} req : Cuerpo de la tupla a crear en Recipe
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

/**
 * Método GET de todas las receta en la tabla
 * 
 * @param {*} pagination : Información de la paginación. Determina el número de recetas a devolver
 * @param {*} status : Estado de actividad/inactividad de la receta
 * @returns recipes : JSON con la información de las recetas con Status = 1
 */
const getAllRecipe = async (pagination, status = 1) => {
    const amount = await Recipe.count({
        where: {
            status: status
        }
    });

    return Recipe.findAll({
        include: User,
        where: {
            status: status
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(recipes => {
        return JSON.parse(JSON.stringify({ data: MapListRecipes(recipes), totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
};

const getMyRecipes = async (pagination, userId) => {
    return await getByUsersId(pagination, [userId]);
};

const getRecipesFromMyFollowings = async (pagination, userId) => {
    const myFollowings = await Follow.findAll({
        attributes: ['followId'],
        where: {
            userId: userId
        }
    });

    var followings = JSON.parse(JSON.stringify(myFollowings, null, 2));

    return await getByUsersId(pagination, followings.map(x => x.followId));
};


const getByUsersId = async (pagination, usersId) => {
    return Recipe.findAndCountAll({
        include: User,
        where: {
            userId: usersId,
            status: 1
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(recipes => {
        return JSON.parse(JSON.stringify({ data: MapListRecipes(recipes.rows), totalPage: Math.ceil(recipes.count / pagination.header.size) }, null, 2));
    });
};

const getAllRecipeByTitle = async (title, pagination, status = 1) => {
    const amount = await Recipe.count({
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            },
            status: status
        }
    });

    return Recipe.findAll({
        include: User,
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            },
            status: status
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(recipes => {
        return JSON.parse(JSON.stringify({ data: MapListRecipes(recipes), totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
};

const getAllRecipeByIngredients = async (ingredients, pagination, status = 1) => {
    const matchAtLessOne = await RecipeIngredient.findAll({
        attributes: ['recipeId', [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('ingredientId'))), 'countIngredients']
        ],
        group: "recipeId",
        where: {
            ingredientId: ingredients
        }
    });

    var objLstRecipes = JSON.parse(JSON.stringify(matchAtLessOne, null, 2));
    var lstRecipes = [];
    objLstRecipes.forEach(recipe => {
        if (recipe.countIngredients >= ingredients.length) {
            lstRecipes.push(recipe.recipeId);
        }
    });

    return Recipe.findAndCountAll({
        include: [User, Ingredient],
        where: {
            id: lstRecipes,
            status: status
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(recipes => {
        return JSON.parse(JSON.stringify({ data: MapListRecipes(recipes.rows), totalPage: Math.ceil(recipes.count / pagination.header.size) }, null, 2));
    });
};

/**
 * Método GET de tuplas en Receta con base en su Id
 * 
 * @param {number} recipeId : Número de identificación de la receta a encontrar
 * @param {*} status : Estado de actividad/inactividad de la receta
 * @returns la receta asociada al id si su estatus es 1
 */
const getRecipeById = async (recipeId, status = 1) => {
    var recipe = await Recipe.findOne({
        include: User,
        where: {
            id: recipeId,
            status: status
        },
    });
    if (!recipe) {
        return null;
    }

    return new GetRecipeResponse(recipe.dataValues);
};

const getRandomRecipe = async (pagination, status = 1) => {
    return Recipe.findAndCountAll({
        include: User,
        order: Sequelize.literal('rand()'), limit: 1,
        where: {
            status: status
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(recipes => {
        if (recipes != null && recipes.rows != null) {
            return new GetRecipeResponse(JSON.parse(JSON.stringify(recipes.rows[0])));
        }
        return null;
    });
};

/**
 * Método PUT de tuplas en Recipe
 * 
 * @param {number} recipeId : Número identificador de la receta a actualizar
 * @param {*} req : Cuerpo de la tupla a actualizarce
 * @returns la receta actualizada
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
 * Método PUT del status de una tupla de Recipe con base en su Id para su desactivación
 * 
 * @param {number} recipeId : Número identificador de la receta a eliminar (desactivar)
 * @returns el número de tuplas afectadas
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

/**
 * Método PUT del status de una tupla de Recipe con base en su Id para su activación
 * 
 * @param {number} recipeId : Número identificador de la receta a reactivación
 * @returns el número de tuplas afectadas
 */
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

module.exports = { postRecipe, getAllRecipe, getMyRecipes, getRecipesFromMyFollowings, getRandomRecipe, getAllRecipeByTitle, getAllRecipeByIngredients, getRecipeById, updateRecipe, deleteRecipe, reactivateRecipe };