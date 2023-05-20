const { success, error } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const scoreService = require('../services/scoreService');
const recipeService = require('../services/recipeService');

/**
 * Obtiene la puntuación en la DB del usuario
 * 
 * @param {*} req : Información del request 
 * @param {*} res : Respuesta del servicio
 * @returns Información de la puntuación
 */

const getMyScore = async (req, res) => {
    try {
        var userId = req.params.userId
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");

        const recipeExist = await recipeService.getRecipeById(recipeId);
        if (recipeExist == null) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró el id de la receta proporcionada", null, statusCode.NoContent));
        }

        return scoreService.getMyScore(userId, recipeId).then(result => {
            res
                .status(statusCode.OK)
                .json(success("OK", { score: result == null ? null : result.score }, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Crea una una puntuación
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de creación
 */

const postScore = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

        const recipeExist = await recipeService.getRecipeById(body.recipeId);
        if (recipeExist == null) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró el id de la receta proporcionada", null, statusCode.NoContent));
        }

        var alreadyScore = await scoreService.getMyScore(body.userId, body.recipeId);
        if (alreadyScore) {
            return res
                .status(statusCode.OK)
                .json(success("Has calificado esta receta con anterioridad", alreadyScore, statusCode.OK));
        }

        return scoreService.postScore(body).then(score => {
            res
                .status(statusCode.Created)
                .json(success("Created", score, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Actualiza una puntuación con base en su id
 * 
 * @param {*} req : Información del request: el id de la puntuación
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la actualización
 */

const putScore = async (req, res) => {
    try {
        var userId = req.params.userId
        var recipeId = req.params.recipeId;
        var body = req.body;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(userId, req.data);

        var existScore = await scoreService.getMyScore(userId, recipeId);
        if (!existScore) {
            return res
                .status(statusCode.OK)
                .json(success("No se ha encontrado la puntuación a editar", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(existScore.userId, req.data.id);

        return scoreService.putScore(existScore.id, body, recipeId).then(score => {
            res
                .status(statusCode.OK)
                .json(success("OK", score, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Elimina una puntuación
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la eliminación
 */

const deleteScore = async (req, res) => {
    try {
        var userId = req.params.userId
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(userId, req.data);

        var score = await scoreService.getMyScore(userId, recipeId);

        if (!score) {
            return res
                .status(statusCode.OK)
                .json(success("No se ha encontrado la puntuación a eliminar", null, statusCode.NoContent));
        }

        Validator.ValidateOwner(score.userId, req.data.id);

        return scoreService.deleteScore(score.id, recipeId).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getMyScore, postScore, putScore, deleteScore };