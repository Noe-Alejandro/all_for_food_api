const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Función de middleware para validar el JWT del header del request
 * 
 * @param {*} req : Cuerpo del request a validar
 * @param {*} res : Respuesta de la validación
 * @param {*} next : La siguiente función del middleware
 * @returns {function validateAdmin(req, res, next)} : Llama la siguiente función del middleware si el token es válido, 
 * regresa error de otra forma
 */
const validateJWT = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(400).send('Access denied');
    }

    jwt.verify(accessToken, process.env.SECRET, (err, data) => {
        if (err) {
            return res.status(401).send('Access denied, token expired or incorrect');
        } else {
            req.data = data;
            next();
        }
    });
}

/**
 * Función de middleware para validar si el usuario tiene permisos de Admin con base en información de permisos del request
 * 
 * @param {*} req : Cuerpo del request
 * @param {*} res : Respuesta de la validación
 * @param {*} next : La siguiente función del middleware
 * @returns {function generateAccessToken(req, res, next) } : Llama la siguiente función del middleware si el usuario tiene
 *  permisos de admin, regresa error de otra forma
 */
const validateAdmin = async (req, res, next) => {
    if (req.data.permission == 'Admin') {
        console.log("you are admin");
        next();
    } else {
        console.log("you are not admin");
        return res.status(401).send("You don't have admin permissions");
    }
}

/**
 * generateAccessToken crea un token con la información de usuario en el request que expira en 8 horas
 * 
 * @param {*} data : Datos del usuario a registrar en el Token
 * @returns el Token
 */
const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '8h' });
}

module.exports = { validateJWT, validateAdmin, generateAccessToken };