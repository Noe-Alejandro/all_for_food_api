
const { success, error, validation } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const userService = require('../services/userService');

const getAllUser = (req, res) => {
    try {
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");

        return userService.getAllUser(id).then(users => {

            res
                .status(statusCode.OK)
                .json(success("OK", users, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const postUser = (req, res) => {
    try {
        var body = req.body;

        return userService.postUser(body).then(user => {
            res
                .status(statusCode.Created)
                .json(success("Created", user, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

const putUSer = (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");

        return userService.putUser(id, body).then(affectedRow => {
            if (affectedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un usuario con el id proporcionado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", affectedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

const deleteUser = (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");

        return userService.deleteUser(id, body).then(affectedRow => {
            if (affectedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un usuario con el id proporcionado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", affectedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
}



module.exports = { getAllUser, postUser, putUSer, deleteUser};