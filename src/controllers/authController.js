
const { success, successToken } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const authService = require('../services/authService');
const { generateAccessToken } = require('../middleware/auth/auth');

/**
 * Autentificación un usuario con la información de email y contraseña del cuerpo del request
 * 
 * @param {*} req : Cuerpo del request con información del usuario
 * @param {*} res : Respuesta a la autenticación
 * @returns El token de autenticación si la autenticación fue exitosa o un mensaje de error si no lo fue
 */
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const response = await authService.authUser(email, password);

        if (response) {
            const accessToken = generateAccessToken(
                {
                    id: response.id,
                    username: response.username,
                    permission: response.permission
                });
            return res
                .status(statusCode.OK)
                .json(success("Ok", { token: accessToken }, statusCode.OK));
        } else {
            return res
                .status(statusCode.OK)
                .json(success("User not found", null, statusCode.OK));
        }
    } catch (e) {
        HandlerException(e, res)
    }
}

/**
 * Recupera el token de autenticación para un usuario con su id
 * 
 * @param {*} req : Cuerpo del request con el id del usuario
 * @param {*} res : Respuesta a la autenticación
 * @returns La información del usuario y el token de autenticación si el usuario fue encontrado o un mensaje de error si no lo fue
 */
const authToken = async (req, res) => {
    try {
        const response = await authService.authToken(req.data.id);

        if (response) {
            return res
                .status(statusCode.OK)
                .json(success("Ok", {
                    id: response.id,
                    username: response.username,
                    icon: response.icon,
                    email: response.email,
                    permission: response.permission
                }, statusCode.OK));
        } else {
            return res
                .status(statusCode.OK)
                .json(success("User not found", null, statusCode.OK));
        }
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { authUser, authToken };