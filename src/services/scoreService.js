const Score = require('../database/models/score');

const getMyScore = async (userId, recipeId) => {

    return Score.findOne({
        where: {
            userId: userId,
            recipeId: recipeId
        }
    },
    ).then(score => {
        if (score != null) {
            return score.dataValues;
        }
        return null;
    });
};

const postScore = async (req) => {
    const score = await Score.create({
        userId: req.userId,
        recipeId: req.recipeId,
        score: req.score
    });
    return score.dataValues;
};

const putScore = async (id, req) => {
    return Score.update(
        {
            score: req.score
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            return result[0]
        }
        );
}

const deleteScore = async (id) => {
    return Score.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

module.exports = { getMyScore, postScore, putScore, deleteScore };