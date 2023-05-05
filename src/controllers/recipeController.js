const { success, error, validation } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const recipeService = require('../services/recipeService');

const postRecipe = (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        return recipeService.postRecipe(body).then(recipe => {
            res
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
                .json(success("OK", recipes.data, statusCode.OK, pagination.header, recipes.totalPage));
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
                .json(success("No se encontró una receta con el id proporcionado o está desactivada", null, statusCode.OK));
        }

        Validator.ValidateOwner(recipe.userId, body.userId);

        return recipeService.updateRecipe(recipeId, body).then(updatedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", updatedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const deleteRecipe = async (req, res) => {
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
                .json(success("No se encontró una receta con el id proporcionado o ya se encuentra desactivada", null, statusCode.OK));
        }

        Validator.ValidateOwner(recipe.userId, body.userId);

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
            res
                .status(statusCode.OK)
                .json(success("No se encontró una receta con el id proporcionado o ya se encuentra activa", null, statusCode.OK));
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

module.exports = { postRecipe, getAllRecipe, getRecipeById, updateRecipe, deleteRecipe, reactivateRecipe };