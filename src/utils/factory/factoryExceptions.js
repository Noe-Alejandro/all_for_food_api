const { InvalidIdException, NotMatchTokenUserId, NotOwnerException, InvalidPasswordFormatException } = require('../exceptions/customException');
const statusCode = require('../helpers/statusCode');

class ExceptionFactory {
    /**
     * Crea los mensajes de excepción para cada caso
     * 
     * @param {*} exception : El tipo de excepción
     * @param {*} message : El mensaje de respuesta para la excepción
     * @returns metadatos del error
     */
    static create(exception, message) {
        switch (exception) {
            case "InvalidId":
                return new InvalidIdException(message == null ? "Invalid Id provided" : message, { status: statusCode.UnprocessableContent });
            case "NotMatchTokenUserId":
                return new NotMatchTokenUserId(message == null ? "Not match id provided with token user id" : message, { status: statusCode.Forbidden });
            case "NotOwnerException":
                return new NotOwnerException(message == null ? "You are not the resource owner" : message, { status: statusCode.Forbidden });
            case "InvalidPasswordFormatException":
                return new InvalidPasswordFormatException(message == null ? "Password format provided is invalid" : message, { status: statusCode.UnprocessableContent });
        }
    }
}

module.exports = { ExceptionFactory };