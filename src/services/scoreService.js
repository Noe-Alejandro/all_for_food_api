const Score = require('../database/models/score');
const Recipe = require('../database/models/recipe');

/**
 * Metodo para obtener el puntaje de un uario especifico 
 * 
 * @param {*} userId : Numero indentificador del usuario
 * @param {*} recipeId : Numero indentificador de la receta
 * @returns El puntaje del usuario
 */

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

/**
 * Metodo POST del putaje o score
 * @param {*} req  :Cuerpo de la tupla a crear en score
 * @returns score
 */

const postScore = async (req) => {
    const score = await Score.create({
        userId: req.userId,
        recipeId: req.recipeId,
        score: req.score
    });
    await updateScoreForRecipe(req.recipeId);
    return score.dataValues;
};

/**
 * * Método put que actualiza la información de un score
 * 
 * @param {*} id : Número identificador del score a actualizar
 * @param {*} req : Cuerpo de la tupla a actualizarce
 * @returns El score actualizado
 */

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

/**
 * Metodo para elimiar un score 
 * 
 * @param {*} id : Número identificador del score a eliminar
 * @param {*} recipeId : Número identificador de la receta
 * @returns El score eliminado
 */

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

/**
 * Metodo para actualizar un score por el id de la receta
 * @param {*} recipeId : Número identificador de la receta
 */

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