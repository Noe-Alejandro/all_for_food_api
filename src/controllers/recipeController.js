const { success, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const recipeService = require('../services/recipeService');
const { MapListRecipes } = require("../models/responses/recipe/getRecipe");

const postRecipe = (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        return recipeService.postRecipe(body).then(recipe => {
            if (recipe == null) {
                return res
                    .status(statusCode.BadRequest)
                    .json(success("Algún id de los ingredientes proporcionados no se encuentra en la base de datos", null, statusCode.BadRequest));
            }
            return res
                .status(statusCode.Created)
                .json(success("Created", recipe, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const getAllRecipe = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return recipeService.getAllRecipe(pagination).then(recipes => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", recipes.data, statusCode.OK, pagination.header, recipes.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getAllRecipeByTitle = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return recipeService.getAllRecipeByTitle(req.body.title, pagination).then(recipes => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", recipes.data, statusCode.OK, pagination.header, recipes.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getAllRecipeByIngredients = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return recipeService.getAllRecipeByIngredients(req.body.ingredients, pagination).then(recipes => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", recipes.data, statusCode.OK, pagination.header, recipes.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getAllRecipeForAdmin = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var status = req.params.status;

        return recipeService.getAllRecipe(pagination, status).then(recipes => {
            if (recipes == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Sin resultados", [], statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(successPage("OK", MapListRecipes(recipes.data), statusCode.OK, pagination.header, recipes.totalPage));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getRecipeById = (req, res) => {
    try {
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        return recipeService.getRecipeById(recipeId).then(recipe => {
            if (recipe == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un usuario con el id proporcionado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", recipe, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getMyRecipes = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var userId = req.params.userId;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        return recipeService.getMyRecipes(pagination, userId).then(recipes => {
            if (recipes == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Sin resultados", null, statusCode.NoContent));
            } else {
                res
                    .status(statusCode.OK)
                    .json(successPage("OK", MapListRecipes(recipes.data), statusCode.OK, pagination.header, recipes.totalPage));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getRecipesFromMyFollowings = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var userId = req.params.userId;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        return recipeService.getRecipesFromMyFollowings(pagination, userId).then(recipes => {
            if (recipes == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Sin resultados", null, statusCode.NoContent));
            } else {
                res
                    .status(statusCode.OK)
                    .json(successPage("OK", MapListRecipes(recipes.data), statusCode.OK, pagination.header, recipes.totalPage));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getRandomRecipe = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return recipeService.getRandomRecipe(pagination).then(recipe => {
            if (recipe == null) {
                res
                    .status(statusCode.OK)
                    .json(success("SIn resultados", null, statusCode.NoContent));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", recipe, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const updateRecipe = async (req, res) => {
    try {
        var body = req.body;
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        var recipe = await recipeService.getRecipeById(recipeId);

        if (!recipe) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró una receta con el id proporcionado o está desactivada", null, statusCode.NoContent));
        }
        Validator.ValidateOwner(recipe.user.id, body.userId);

        return recipeService.updateRecipe(recipeId, body).then(updatedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", updatedRow.data, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const deleteRecipe = async (req, res) => {
    try {
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        var recipe = await recipeService.getRecipeById(recipeId);

        if (!recipe) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró una receta con el id proporcionado o ya se encuentra desactivada", null, statusCode.NoContent));
        }

        return recipeService.deleteRecipe(recipeId).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const reactivateRecipe = async (req, res) => {
    try {
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        var recipe = await recipeService.getRecipeById(recipeId, 0);
        if (!recipe) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró una receta con el id proporcionado o ya se encuentra activa", null, statusCode.NoContent));
        }

        return recipeService.reactivateRecipe(recipeId).then(reactivatedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", reactivatedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e);
    }
};

module.exports = { postRecipe, getAllRecipe, getMyRecipes, getRecipesFromMyFollowings, getRandomRecipe, getAllRecipeByTitle, getAllRecipeByIngredients, getAllRecipeForAdmin, getRecipeById, updateRecipe, deleteRecipe, reactivateRecipe };