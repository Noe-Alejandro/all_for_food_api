const { success, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const commentService = require('../services/commentService');
const recipeService = require('../services/recipeService');
const { MapListComment } = require("../models/responses/comment/getComment");

/**
 * Obtiene todos los comentarios en la receta del request
 * 
 * @param {*} req : Información del request: el id de la receta 
 * @param {*} res : Respuesta del servicio
* @returns Información de todos los comentarios en la receta
 */
const getAllComment = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        return commentService.getAllComment(recipeId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", MapListComment(result.data), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Obtiene todos los comentarios del usuario en la receta del request
 * 
 * @param {*} req : Información del request: el id del usuario, el id la receta 
 * @param {*} res : Respuesta del servicio
* @returns Información de todos los comentarios en la receta hechos por el usuario
 */
const getMyComments = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var recipeId = req.params.recipeId;
        var userId = req.params.userId

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        if (userId)
            Validator.ValidateId(userId, "El id del usuario es inválido")

        return commentService.getMyComments(recipeId, userId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", MapListComment(result.data), statusCode.OK, pagination.header, result.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Crea un comentario
 * 
 * @param {*} req : Información del request: el id de la receta 
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de creación
 */
const postComment = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        var recipeExist = await recipeService.getRecipeById(body.recipeId);
        if (recipeExist == null) {
            return res
                .status(statusCode.OK)
                .json(success("La receta con el id proporcionado no existe", null, statusCode.NoContent));
        }

        return commentService.postComment(body).then(comment => {
            res
                .status(statusCode.Created)
                .json(success("Created", comment, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Actualiza un comentario con base en su id
 * 
 * @param {*} req : Información del request: el id del comentario
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la actualización
 */
const putComment = async (req, res) => {
    try {
        var body = req.body;
        var commentId = req.params.commentId;

        Validator.ValidateId(commentId, "El id del comentario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        var comment = await commentService.getCommentById(commentId);

        if (!comment) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró un comentario con el id proporcionado", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(comment.userId, body.userId);

        return commentService.putComment(commentId, body).then(affectedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", affectedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Elimina un comentario con base en su id
 * 
 * @param {*} req : Información del request: el id del comentario
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de eliminación del comentario
 */
const deleteComment = async (req, res) => {
    try {
        var commentId = req.params.commentId;

        Validator.ValidateId(commentId, "El id del comentario es inválido");

        var comment = await commentService.getCommentById(commentId);

        if (!comment) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró un comentario con el id proporcionado", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(comment.userId, req.data.id);

        return commentService.deleteComment(commentId).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getAllComment, postComment, putComment, deleteComment, getMyComments };