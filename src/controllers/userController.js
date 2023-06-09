
const { success, error, validation, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const userService = require('../services/userService');
const { GetUserResponse, MapListUser } = require("../models/responses/user/getUser");
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

/**
 * Obtiene todos los usuarios en la DB
 * 
 * @param {*} req : Información del request 
 * @param {*} res : Respuesta del servicio
 * @returns Información de todas los usuarios
 */

const getAllUser = (req, res) => {
    try {
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");

        return userService.getAllUser(id).then(users => {
            if (users == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un usuario con el id proporcionado", null, statusCode.NoContent));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", users, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Obtiene todos los usuarios en la DB desde el admin
 * 
 * @param {*} req : Información del request 
 * @param {*} res : Respuesta del servicio
 * @returns Información de todas los usuarios
 */

const getAllUserForAdmin = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var status = req.params.status;

        return userService.getAllUserForAdmin(status, pagination).then(users => {
            if (users == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Sin resultados", [], statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(successPage("OK", MapListUser(users.data), statusCode.OK, pagination.header, users.totalPage));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

/**
 * Crea un usuario
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de creación
 */

const postUser = async (req, res) => {
    try {
        var body = req.body;

        Validator.ValidatePasswordFormat(body.password);
        if (!body.username || body.username.trim().length === 0) {
            return res
                .status(statusCode.BadRequest)
                .json(error("Debe de ingresar un nombre de usuario", statusCode.BadRequest));
        }
        var emailInUse = await userService.validateEmailExist(body.email);
        if (emailInUse) {
            return res
                .status(statusCode.UnprocessableContent)
                .json(error("El correo ingresado ya se encuentra en uso", statusCode.UnprocessableContent));
        }

        return userService.postUser(body).then(user => {
            res
                .status(statusCode.Created)
                .json(success("Created", new GetUserResponse(user), statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Actualiza un usuario con base en su id
 * 
 * @param {*} req : Información del request: el id del usuario
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la actualización
 */


const putUSer = async (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");
        Validator.ValidateMatchTokenUserId(id, req.data);

        if (body.password) {
            Validator.ValidatePasswordFormat(body.password);
        }

        if (body.email != null) {
            var emailInUse = await userService.validateEmailExist(body.email);
            if (emailInUse) {
                Validator.ValidateOwner(emailInUse.id, id, "El email proporcionado ya se encuentra en uso");
            }
        }

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

/**
 * Elimina un usuario
 * 
 * @param {*} req : Información del request: id del usuario
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la eliminación
 */

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

/**
 * reactiva un usuario previamente eliminado
 * 
 * @param {*} req : Información del request
 * @param {*} res : Respuesta del servicio
 * @returns confirmación de la reactivación
 */

const reactiveUser = (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(id, "El id del usuario es inválido");

        return userService.reactiveUser(id, body).then(affectedRow => {
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


module.exports = { getAllUser, getAllUserForAdmin, postUser, putUSer, deleteUser, reactiveUser };