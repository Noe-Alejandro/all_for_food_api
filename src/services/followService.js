const Follow = require('../database/models/follow');
const User = require('../database/models/user');

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

const postFollow = async (req) => {
    const follow = await Follow.create({
        userId: req.userId,
        followId: req.followId
    });
    return follow.dataValues;
};

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