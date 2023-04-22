function InvalidIdException(message, metadata) {
    const error = new Error(message);
    error.metadata = metadata;
    return error;
}

InvalidIdException.prototype = Object.create(Error.prototype);

module.exports = { InvalidIdException };