
const { success, successToken } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const response = await authService.authUser(email, password);

        const accessToken = generateAccessToken(
            {
                id: response.id,
                username: response.username
            });

        if (response) {
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
        const response = await authService.authToken(req.user.id);

        if (response) {
            return res
                .status(statusCode.OK)
                .json(success("Ok", response, statusCode.OK));
        } else {
            return res
                .status(statusCode.OK)
                .json(success("User not found", null, statusCode.OK));
        }
    } catch (e) {
        HandlerException(e, res)
    }
}

const validateJWT = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(403).send('Access denied');
    }

    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Access denied, token expired or incorrect');
        } else {
            req.user = user;
            next();
        }
    });
}

function generateAccessToken(data) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '10m' });
}

module.exports = { authUser, authToken, validateJWT };