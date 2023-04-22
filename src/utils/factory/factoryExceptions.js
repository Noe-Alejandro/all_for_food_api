const { InvalidIdException } = require('../exceptions/InvalidIdException');
const statusCode = require('../helpers/statusCode');

class ExceptionFactory {
    static create(exception, message) {
        switch (exception) {
            case "InvalidId":
                return new InvalidIdException(message == null ? "Invalid Id provided" : message, { status: statusCode.UnprocessableContent });
        }
    }
}

module.exports = { ExceptionFactory };