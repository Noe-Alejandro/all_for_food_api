const Follow = require('../database/models/follow');
const User = require('../database/models/user');

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

module.exports = { getMyFollowings, getIsFollowByUserIds, getMyFollowers, getFollow, postFollow, deleteFollow };