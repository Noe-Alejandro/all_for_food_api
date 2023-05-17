const Score = require('../database/models/score');
const Recipe = require('../database/models/recipe');

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
    await updateScoreForRecipe(req.recipeId);
    return score.dataValues;
};

const putScore = async (id, req, recipeId) => {
    return Score.update(
        {
            score: req.score
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            updateScoreForRecipe(recipeId);
            return result[0]
        }
        );
}

const deleteScore = async (id, recipeId) => {
    return Score.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            updateScoreForRecipe(recipeId);
            return result
        }
        );
}

async function updateScoreForRecipe(recipeId) {
    const allScore = await Score.findAndCountAll({
        where: {
            recipeId: recipeId
        }
    });

    var objectLst = JSON.parse(JSON.stringify(allScore.rows, null, 2));

    var sum = 0;
    objectLst.forEach(item => {
        sum += item.score
    });
    await Recipe.update(
        {
            rate: allScore.count == 0 ? 0 : sum / allScore.count
        },
        {
            where: {
                id: recipeId
            }
        }
    );
}

module.exports = { getMyScore, postScore, putScore, deleteScore };