const Favorite = require('../database/models/favorite');
const Recipe = require('../database/models/recipe');
const User = require('../database/models/user');

const getMyFavorites = async (userId, pagination) => {
    return Favorite.findAndCountAll({
        include: [
            {
                model: Recipe,
                include: {
                    model: User
                },
                where: {
                    status: 1
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
            return JSON.parse(JSON.stringify({ data: favorites.rows, totalPage: Math.ceil(favorites.count / pagination.header.size) }, null, 2));
        }
        return null;
    });
};

const getIsFavoritesByIds = async (userId, recipeIds) => {
    const recipes = await Favorite.findAll({
        where: {
            userId: userId,
            recipeId: recipeIds
        }
    });
    var recipeLst = JSON.parse(JSON.stringify(recipes, null, 2));
    var response = [];
    recipeIds.forEach(item => {
        var matched = recipeLst.find(x => x.recipeId == item);
        var isFavorite = true;
        if (!matched || matched == null) {
            isFavorite = false
        }
        response.push({
            recipeId: item,
            isFavorite: isFavorite
        });
    });
    return response;
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

module.exports = { getMyFavorites, getFavorite, postFavorite, deleteFavorite, getIsFavoritesByIds };