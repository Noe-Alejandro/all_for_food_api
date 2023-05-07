function InvalidIdException(message, metadata) {
    return createError(message, metadata);
}

function NotMatchTokenUserId(message, metadata) {
    return createError(message, metadata);
}

function NotOwnerException(message, metadata) {
    return createError(message, metadata);
}

function InvalidPasswordFormatException(message, metadata) {
    return createError(message, metadata);
}

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