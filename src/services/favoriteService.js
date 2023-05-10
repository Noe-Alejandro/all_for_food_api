const Favorite = require('../database/models/favorite');
const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');

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

const postFavorite = async (req) => {
    const favorite = await Favorite.create({
        userId: req.userId,
        recipeId: req.recipeId
    });
    return favorite.dataValues;
};

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