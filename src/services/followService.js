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
    return Follow.findAndCountAll({
        include: [{
            model: User,
            as: 'following',
            foreignKey: 'followId',
            where: {
                status: 1
            }
        }],
        where: {
            userId: userId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(followings => {
        if (followings != null) {
            var responseFollowing = JSON.parse(JSON.stringify(followings.rows, null, 2));
            var response = responseFollowing.map(item => (item.following));
            return JSON.parse(JSON.stringify({ data: response, totalPage: Math.ceil(followings.count / pagination.header.size) }, null, 2));
        }
        return null;
    });
};

/**
 * Obtiene el estado de seguidor de una lista de usuarios especificados para un usuario dado
 * 
 * @param {*} userId : el id del usuario
 * @param {*} userIds : un array de los ids de los usuarios a verificar
 * @returns regresa una promesa que se resuelve con un array de objetos que indican el estado de follow de cada usuario
 */
const getIsFollowByUserIds = async (userId, userIds) => {
    const follows = await Follow.findAll({
        where: {
            userId: userId,
            followId: userIds
        }
    });
    var followLst = JSON.parse(JSON.stringify(follows, null, 2));
    var response = [];
    userIds.forEach(item => {
        var matched = followLst.find(x => x.followId == item);
        var isFollow = true;
        if (!matched || matched == null) {
            isFollow = false
        }
        response.push({
            userId: item,
            isFollow: isFollow
        });
    });
    return response;
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
    return Follow.findAndCountAll({
        include: [{
            model: User,
            as: 'follower',
            foreignKey: 'userId',
            where: {
                status: 1
            }
        }],
        where: {
            followId: userId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(followers => {
        if (followers != null) {
            var responseFollwers = JSON.parse(JSON.stringify(followers.rows, null, 2));
            var response = responseFollwers.map(item => (item.follower));
            return JSON.parse(JSON.stringify({ data: response, totalPage: Math.ceil(followers.count / pagination.header.size) }, null, 2));
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

module.exports = { getMyFollowings, getIsFollowByUserIds, getMyFollowers, getFollow, postFollow, deleteFollow };