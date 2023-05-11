const Follow = require('../database/models/follow');
const User = require('../database/models/user');

/**
 * Obtiene la lista de usuarios que el usuario específico sigue
 * 
 * @param {*} userId : el id del usuario seguidor
 * @param {*} pagination : configuración de la paginación
 * @returns regresa una promesa que se resuelve con la lista de usuarios que el usuario específico sigue
 * @throws {Error} si algún error ocurre al recuperar la info
 */
const getMyFollowings = async (userId, pagination) => {
    const amount = await Follow.count({
        where: {
            userId: userId
        },
    });
    return Follow.findAll({
        include: [{
            model: User,
            as: 'following',
            foreignKey: 'followId'
        }],
        where: {
            userId: userId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(followings => {
        if (followings != null) {
            var responseFollowing = JSON.parse(JSON.stringify(followings, null, 2));
            var response = responseFollowing.map(item => (item.following));
            return JSON.parse(JSON.stringify({ data: response, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
        }
        return null;
    });
};

/**
 * Obtiene la lista de usuarios que siguen al usuario específico 
 * 
 * @param {*} userId : el id del usuario al que siguen
 * @param {*} pagination : configuración de la paginación
 * @returns regresa una promesa que se resuelve con la lista de usuarios que siguen al usuario específico 
 * @throws {Error} si algún error ocurre al recuperar la info
 */
const getMyFollowers = async (userId, pagination) => {
    const amount = await Follow.count({
        where: {
            followId: userId
        },
    });
    return Follow.findAll({
        include: [{
            model: User,
            as: 'follower',
            foreignKey: 'userId'
        }],
        where: {
            followId: userId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(followers => {
        if (followers != null) {
            var responseFollwers = JSON.parse(JSON.stringify(followers, null, 2));
            var response = responseFollwers.map(item => (item.follower));
            return JSON.parse(JSON.stringify({ data: response, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
        }
        return null;
    });
};

/**
 * Obtiene la información de la relación follow entre dos usuarios
 * 
 * @param {*} userId : el id del usuario que sigue
 * @param {*} followId : el id del usuario que es seguido
 * @returns regresa una promesa que se resuelve si la relación existe, devuelve null de otra forma
 * @throws {Error} si algún error ocurre al recuperar la info
 */
const getFollow = async (userId, followId) => {
    return Follow.findOne({
        where: {
            userId: userId,
            followId: followId
        }
    },
    ).then(follow => {
        if (follow != null) {
            return follow.dataValues;
        }
        return null;
    });
};

/**
 * Crea una nueva tupla en la relación follow entre dos usuarios
 * @param {*} req : El request con la información de los ids de los usuarios
 * @returns regresa una promesa que se resuelve con un objeto que representa la nueva relación follow
 */
const postFollow = async (req) => {
    const follow = await Follow.create({
        userId: req.userId,
        followId: req.followId
    });
    return follow.dataValues;
};

/**
 * Elimina una relación follow en la DB
 * @param {*} id : el id de la tupla de la relación a eliminar
 * @returns regresa una promesa que se resuelve con el número de tuplas eliminadas
 */
const deleteFollow = async (id) => {
    return Follow.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

module.exports = { getMyFollowings, getMyFollowers, getFollow, postFollow, deleteFollow };