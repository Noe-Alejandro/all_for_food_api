const { ExceptionFactory } = require('../factory/factoryExceptions');

class Validator {
    static ValidateId(id, message = null) {
        if (!id || String(id) < 0) {
            throw ExceptionFactory.create("InvalidId", message);
        }
    }

    static ValidateMatchTokenUserId(requestId, data, message = null) {
        if (requestId != data.id) {
            throw ExceptionFactory.create("NotMatchTokenUserId", message);
        }
    }

    static ValidateOwner(dbOwnerId, requestId, message = null) {
        if (dbOwnerId != requestId) {
            throw ExceptionFactory.create("NotOwnerException", message);
        }
    }

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