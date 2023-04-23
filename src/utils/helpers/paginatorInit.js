const { pagination } = require('../../configs/config');

function GetConfigPagination(req) {
    var { page = pagination.page, size = pagination.size } = req.query;
    console.log(page);
    page-=1;
    console.log(page);
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