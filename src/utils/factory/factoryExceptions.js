const { InvalidIdException, NotMatchTokenUserId, NotOwnerException } = require('../exceptions/InvalidIdException');
const statusCode = require('../helpers/statusCode');

class ExceptionFactory {
    static create(exception, message) {
        switch (exception) {
            case "InvalidId":
                return new InvalidIdException(message == null ? "Invalid Id provided" : message, { status: statusCode.UnprocessableContent });
            case "NotMatchTokenUserId":
                return new NotMatchTokenUserId(message == null ? "Not match id provided with token user id" : message, { status: statusCode.Forbidden });
            case "NotOwnerException":
                return new NotOwnerException(message == null ? "You are not the resource owner" : message, { status: statusCode.Forbidden });
        }
    }
}

module.exports = { ExceptionFactory };