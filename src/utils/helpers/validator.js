const { ExceptionFactory } = require('../factory/factoryExceptions');

class Validator {
    static ValidateId(id, message = null){
        if (!id || String(id) < 0) {
            throw ExceptionFactory.create("InvalidId", message);
        }
    }
}

module.exports = { Validator };