const { pagination } = require('../../configs/config');

function GetConfigPagination(req) {
    var { page = pagination.page, size = pagination.size } = req.query;
    page-=1;
    let config = {
        options: {
            limit: +size,
            offset: (+page) * (+size)
        },
        header: {
            page: page,
            size: size
        }
    };

    return config;
}

module.exports = { GetConfigPagination };