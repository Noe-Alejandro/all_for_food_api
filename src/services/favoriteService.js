const Favorite = require('../database/models/favorite');
const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');

/**
 * Obtiene las recetas favoritas de un usuario y las devuelve paginadas
 * @param {*} userId : el id del usuario
 * @param {*} pagination : Configuración de la paginación
 * @returns regresa una promesa que se resuelve con las recetas favoritas del usuario y el conteo total de páginas, o regresa
 * null si no tiene
 */
const getMyFavorites = async (userId, pagination) => {
    const amount = await Favorite.count({
        where: {
            userId: userId
        },
    });
    return Favorite.findAll({
        include: [
            {
                model: Recipe,
                include: {
                    model: User
                }
            }
        ],
        where: {
            userId: userId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(favorites => {
        if (favorites != null) {
            return JSON.parse(JSON.stringify({ data: favorites, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
        }
        return null;
    });
};

/**
 * Obtiene una receta específica de entre los favoritos de acuerdo al id de la receta y del usuario
 * @param {*} userId : el id del usuario
 * @param {*} recipeId : el id de la receta
 * @returns regresa una promesa que se resuelve con la receta favorita o null si no se encuentra
 */
const getFavorite = async (userId, recipeId) => {
    return Favorite.findOne({
        where: {
            userId: userId,
            recipeId: recipeId
        }
    },
    ).then(favorite => {
        if (favorite != null) {
            return favorite.dataValues;
        }
        return null;
    });
};

/**
 * Crea una nueva receta favorita para un usuario
 * @param {*} req : Información del request: userId, recipeId
 * @returns regresa una promesa que se resuelve con la tupla creada para la nueva receta favorita
 */
const postFavorite = async (req) => {
    const favorite = await Favorite.create({
        userId: req.userId,
        recipeId: req.recipeId
    });
    return favorite.dataValues;
};

/**
 * Elimina una receta de favoritos
 * 
 * @param {*} id : el identificador de la tupla en Favorite
 * @returns regresa una promesa que se resuelve con el número de recetas favoritas eliminadas
 */
const deleteFavorite = async (id) => {
    return Favorite.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

module.exports = { getMyFavorites, getFavorite, postFavorite, deleteFavorite };