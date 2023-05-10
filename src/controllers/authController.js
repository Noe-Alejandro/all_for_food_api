
const { success, successToken } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const authService = require('../services/authService');
const { generateAccessToken } = require('../middleware/auth/auth');

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