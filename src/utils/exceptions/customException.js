/**
 * función para manejo de mensajes de error de InvalidIdException 
 * 
 * @param {*} message : El mensaje de la excepción
 * @param {*} metadata : Información del error
 * @returns llamada a la creación del error para InvalidIdException
 */
function InvalidIdException(message, metadata) {
    return createError(message, metadata);
}

/**
 * función para manejo de mensajes de error de NotMatchTokenUserId 
 * 
 * @param {*} message : El mensaje de la excepción
 * @param {*} metadata : Información del error
 * @returns llamada a la creación del error para NotMatchTokenUserId
 */
function NotMatchTokenUserId(message, metadata) {
    return createError(message, metadata);
}

/**
 * función para manejo de mensajes de error de NotOwnerException 
 * 
 * @param {*} message : El mensaje de la excepción
 * @param {*} metadata : Información del error
 * @returns llamada a la creación del error para NotOwnerException
 */
function NotOwnerException(message, metadata) {
    return createError(message, metadata);
}

/**
 * función para manejo de mensajes de error de InvalidPasswordFormatException 
 * 
 * @param {*} message : El mensaje de respuesta para la excepción
 * @param {*} metadata : Información del error
 * @returns llamada a la creación del error para InvalidPasswordFormatException
 */
function InvalidPasswordFormatException(message, metadata) {
    return createError(message, metadata);
}

/**
 * función para la creación de errores
 * 
 * @param {*} message : El mensaje de la excepción
 * @param {*} metadata : Información del error
 * @returns el error
 */
function createError(message, metadata) {
    const error = new Error(message);
    error.metadata = metadata;
    return error;
}

InvalidIdException.prototype = Object.create(Error.prototype);
NotMatchTokenUserId.prototype = Object.create(Error.prototype);
NotOwnerException.prototype = Object.create(Error.prototype);
InvalidPasswordFormatException.prototype = Object.create(Error.prototype);

module.exports = { InvalidIdException, NotMatchTokenUserId, NotOwnerException, InvalidPasswordFormatException };