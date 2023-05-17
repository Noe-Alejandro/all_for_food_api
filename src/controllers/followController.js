const { success, successPage, error } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const followService = require('../services/followService');
const userService = require('../services/userService');
const { GetConfigPagination } = require("../utils/helpers/paginatorInit");
const { MapListUser } = require("../models/responses/user/getUser");

/**
 * Obtiene la lista de usuarios que un usuario específico sigue
 * 
 * @param {*} req : La información del request: userId, información de paginación
 * @param {*} res : La respuesta del request
 * @returns regresa una promesa que se resuelve con la lista de usuarios que el usuario específico sigue
 * @throws {Error} si ocurre un error mientras recupera la información
 */
const getMyFollowings = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var userId = req.params.userId;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        return followService.getMyFollowings(userId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", MapListUser(result.data), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Obtiene si los usuarios especificados son seguidos por el usuario indicado
 * 
 * @param {*} req : Información del request: userId, userIds
 * @param {*} res : Respuesta del servicio
 * @returns regresa una promesa que se resuelve con el resultado indicando el estado de seguidor del usuario a otros
 */
const getIsFollowByIds = (req, res) => {
    try {
        var userId = req.body.userId;
        var userIds = req.body.userIds;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        if (!userIds | userIds == null) {
            return res
                .status(statusCode.BadRequest)
                .json(success("Se esperaba userIds", null, statusCode.BadRequest));
        }

        return followService.getIsFollowByUserIds(userId, userIds).then(result => {
            res
                .status(statusCode.OK)
                .json(success("OK", result, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Obtiene la lista de usuarios que siguen al usuario específico 
 * 
 * @param {*} req : La información del request: userId, información de paginación
 * @param {*} res : La respuesta del request
 * @returns regresa una promesa que se resuelve con la lista de usuarios que siguen al usuario específico 
 * @throws {Error} si ocurre un error mientras recupera la información
 */
const getMyFollowers = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var userId = req.params.userId;

        Validator.ValidateId(userId, "El id del usuario es inválido");

        return followService.getMyFollowers(userId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", MapListUser(result.data), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Crea una nueva relación follow entre dos usuarios
 * 
 * @param {*} req : Información del request que contiene información de la relación
 * @param {*} res : La respuesta del request
 * @returns regresa una promesa que se resuelve con la información de la nueva relación creada
 */
const postFollow = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.followId, "El id del usuario a seguir no es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        var alreadyFollow = await followService.getFollow(body.userId, body.followId);
        if (alreadyFollow) {
            return res
                .status(statusCode.OK)
                .json(success("Ya sigues a este usuario", alreadyFollow, statusCode.OK));
        }

        var userExist = await userService.getAllUser(body.followId);
        if (userExist == null) {
            return res
                .status(statusCode.OK)
                .json(success("Usuario con el id proporcionado no fue encontrado", null, statusCode.NotFound));
        }

        return followService.postFollow(body).then(follow => {
            res
                .status(statusCode.Created)
                .json(success("Created", follow, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Elimina una relación folow entre dos usuarios
 * 
 * @param {Object} req : Información del request: userId, followId
 * @param {Object} res : La respuesta del request
 * @return regresa una promesa que se resuelve con la información de las tuplas afectadas por la eliminación
 */
const deleteFollow = async (req, res) => {
    try {
        var userId = req.params.userId
        var followId = req.params.followId;

        Validator.ValidateId(followId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(userId, req.data);

        var following = await followService.getFollow(userId, followId);
        if (following == null) {
            return res
                .status(statusCode.OK)
                .json(success("No se ha encontrado el 'siguiendo' con los id proporcionados", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(following.userId, userId);

        return followService.deleteFollow(following.id).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getMyFollowings, getIsFollowByIds, getMyFollowers, postFollow, deleteFollow };