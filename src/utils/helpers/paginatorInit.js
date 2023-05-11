const { pagination } = require('../../configs/config');

/**
 * Función para obtener la configuración de la paginación
 * 
 * @param {*} req : El query con la información de pagina y tamaño
 * @returns la configuración
 */
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