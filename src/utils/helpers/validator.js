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
}

module.exports = { Validator };