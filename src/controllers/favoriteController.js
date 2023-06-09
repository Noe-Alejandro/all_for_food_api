const { success, error, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const favoriteService = require('../services/favoriteService');
const recipeService = require('../services/recipeService');
const { GetConfigPagination } = require("../utils/helpers/paginatorInit");
const { MapListRecipes } = require("../models/responses/recipe/getRecipe");

/**
 * Recupera las recetas favoritas de un usuario en específico y manda una respuesta paginada
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns Regresa una promesa que se resuelve con la información paginada de las recetas favoritas o lo rechaza con
 * un mensaje de error
 */
const getMyFavorites = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var userId = req.params.userId;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        return favoriteService.getMyFavorites(userId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", MapListRecipes(result.data.map(x => x.recipe)), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Obtiene si las recetas especificadas son favoritas de un usuario
 * 
 * @param {*} req : Información del request: userId, recipeIds
 * @param {*} res : Respuesta del servicio
 * @returns regresa una promesa que se resuelve con el resultado indicando el estado de favorito de las recetas
 */
const getIsFavoritesByIds = (req, res) => {
    try {
        var userId = req.body.userId;
        var recipeIds = req.body.recipeIds;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        if (!recipeIds | recipeIds == null) {
            return res
                .status(statusCode.BadRequest)
                .json(success("Se esperaba recipeIds", null, statusCode.BadRequest));
        }

        return favoriteService.getIsFavoritesByIds(userId, recipeIds).then(result => {
            res
                .status(statusCode.OK)
                .json(success("OK", result, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Método post para agregar una receta favorita para el usuario asociado al userId y recipeId
 * 
 * @param {*} req : Información del request: userId, recipeId
 * @param {*} res : Respuesta del servicio
 * @returns regresa una promesa que se resuelve con la información de la nueva receta favorita o un mensaje de error
 */
const postFavorite = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        var alreadyFavorite = await favoriteService.getFavorite(body.userId, body.recipeId);
        if (alreadyFavorite) {
            return res
                .status(statusCode.OK)
                .json(success("Ya has agregado esta receta a favoritos", alreadyFavorite, statusCode.OK));
        }

        var recipeExist = await recipeService.getRecipeById(body.recipeId);
        if (!recipeExist) {
            return res
                .status(statusCode.OK)
                .json(success("La receta con el id proporcionado no existe", alreadyFavorite, statusCode.NoContent));
        }

        return favoriteService.postFavorite(body).then(favorite => {
            res
                .status(statusCode.Created)
                .json(success("Created", favorite, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Elimina una receta de la lista de favoritos de acuerdo al id de la receta y el id del usuario
 * 
 * @param {*} req : Información del request: userId, recipeId
 * @param {*} res : Respuesta del servicio
 * @returns regresa una promesa que se resuelve con la información de la receta eliminada o un mensaje de error
 */
const deleteFavorite = async (req, res) => {
    try {
        var userId = req.params.userId
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(userId, req.data);

        var favorite = await favoriteService.getFavorite(userId, recipeId);

        if (!favorite) {
            return res
                .status(statusCode.OK)
                .json(success("No se ha encontrado en sus agregados a favoritos la receta con el id proporcionado", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(favorite.userId, userId);

        return favoriteService.deleteFavorite(favorite.id).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getMyFavorites, postFavorite, deleteFavorite, getIsFavoritesByIds };