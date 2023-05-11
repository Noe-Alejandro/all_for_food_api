const { success, error, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const favoriteService = require('../services/favoriteService');
const { GetConfigPagination } = require("../utils/helpers/paginatorInit");
const { MapListFavorite } = require("../models/responses/favorite/getFavorite");

/**
 * Recupera las recetas favoritas de un usuario en específico y manda una respuesta paginada
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
                .json(successPage("OK", MapListFavorite(result.data), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Método post para agregar una receta favorita para el usuario asociado al userId y recipeId
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
                .json(success("No se ha encontrado agregado a favorito la receta con el id proporcionado", null, statusCode.OK));
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

module.exports = { getMyFavorites, postFavorite, deleteFavorite };