const { success, error } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const scoreService = require('../services/scoreService');

const getMyScore = (req, res) => {
    try {
        var userId = req.params.userId
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        Validator.ValidateId(userId, "El id del usuario es inválido");

        return scoreService.getMyScore(userId, recipeId).then(result => {
            res
                .status(statusCode.OK)
                .json(success("OK", { score: result == null ? null : result.score }, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const postScore = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(body.userId, req.data);

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
                .json(error("No se ha encontrado la puntuación a editar", statusCode.OK));
        }

        Validator.ValidateOwner(existScore.userId, req.data.id);

        return scoreService.putScore(existScore.id, body).then(score => {
            res
                .status(statusCode.OK)
                .json(success("OK", score, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

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
                .json(success("No se ha encontrado la puntuación", null, statusCode.OK));
        }

        Validator.ValidateOwner(score.userId, req.data.id);

        return scoreService.deleteScore(score.id).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getMyScore, postScore, putScore, deleteScore };