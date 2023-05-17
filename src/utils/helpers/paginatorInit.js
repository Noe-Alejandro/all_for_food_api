const { pagination } = require('../../configs/config');

/**
 * Función para obtener la configuración de la paginación
 * 
 * @param {*} req : El query con la información de pagina y tamaño
 * @returns la configuración
 */
function GetConfigPagination(req) {
    var { page = pagination.page, size = pagination.size } = req.query;

    if (!page) {
        page = pagination.page
    }
    if (!size) {
        size = pagination.size
    }
    let config = {};
    if (size == '*') {
        page -= 1;
        config = {
            options: {
                limit: null,
                offset: 0
            },
            header: {
                page: page,
                size: size
            }
        };
    } else {
        page -= 1;
        config = {
            options: {
                limit: +size,
                offset: (+page) * (+size)
            },
            header: {
                page: page,
                size: size
            }
        };
    }
    return config;
}

module.exports = { GetConfigPagination };