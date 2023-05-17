const { ExceptionFactory } = require('../factory/factoryExceptions');

/**
 * Clase que define distintas funciones de validación
 * 
*/
class Validator {
    /**
     * Método que valida que el formato del identificador sea válido
     * 
     * @param {*} id : El identificador a validar
     * @param {*} message : mensaje respuesta de la validación
     */
    static ValidateId(id, message = null) {
        if (!id || String(id) < 0) {
            throw ExceptionFactory.create("InvalidId", message);
        }
    }

    /**
     * Valida que el id de un usuario y el Token del usuario concuerden 
     * @param {*} requestId : El identificador del usuario
     * @param {*} data : La información del Token
     * @param {*} message : mensaje respuesta de la validación 
     */
    static ValidateMatchTokenUserId(requestId, data, message = null) {
        if (requestId != data.id) {
            throw ExceptionFactory.create("NotMatchTokenUserId", message);
        }
    }

    /**
     * Usado para validación de correo. Verifica que el correo en la DB este asociado con el usuario
     * 
     * @param {*} dbOwnerId : El id del usuario asociado con el correo en la DB
     * @param {*} requestId : El id del usuario a validar con dbOwnerId
     * @param {*} message : mensaje respuesta de la validación
     */
    static ValidateOwner(dbOwnerId, requestId, message = null) {
        if (dbOwnerId != requestId) {
            throw ExceptionFactory.create("NotOwnerException", message);
        }
    }

    /**
     * Valida que la contraseña ingresada no tenga espacios en blanco y que al menos tenga 8 caracteres
     * 
     * @param {*} password : El string de constraseña a validar
     */
    static ValidatePasswordFormat(password) {
        var originalLength = password.length;
        var withoutSpacesLength = password.replace(/ /g, '').length;
        if (originalLength != withoutSpacesLength) {
            throw ExceptionFactory.create("InvalidPasswordFormatException", "La contraseña cuenta con espacios en blanco, asegurese de enviarlos sin espacios en blanco por favor.");
        }
        if (password.length < 8) {
            throw ExceptionFactory.create("InvalidPasswordFormatException", "La longitud de la contraseña no es válida, debe ser igual o mayor a 8");
        }
    }
}

module.exports = { Validator };