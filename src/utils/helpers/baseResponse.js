exports.success = (message, results, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        results
    };
};

exports.successToken = (message, results, statusCode, token) => {
    return {
        message,
        error: false,
        code: statusCode,
        token: token,
        results
    };
};

exports.successPage = (message, results, statusCode, options, totalPage) => {
    return {
        message,
        error: false,
        code: statusCode,
        totalPage: totalPage == null ? "*" : totalPage,
        page: (options.page += 1),
        size: options.size == "*" ? options.size : (+options.size),
        data: results
    };
};

exports.error = (message, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true
    };
};

exports.validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
};