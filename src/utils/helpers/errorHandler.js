const statusCode = require('../helpers/statusCode');
const { error, validation } = require("../helpers/baseResponse");

function HandlerException(e, res) {
    if(e.metadata != null){
        res
        .status(e.metadata.status)
        .json(error(e.message, e.metadata.status));
    }else{
        res
        .status(statusCode.InternalServerError)
        .json(error(e.message, statusCode.InternalServerError));
    }
    return;
}

module.exports = { HandlerException };