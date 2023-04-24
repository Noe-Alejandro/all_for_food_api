const Ingredient = require('../database/models/ingredient');

const postIngredient = (req) => {
    return Ingredient.create({
        id: req.id,
        name: req.name
    }).then(ingredient => {
        return ingredient;
    })
}

const getAllIngredient = async (pagination) => {
    const amount = await Ingredient.count();

    return Ingredient.findAll( pagination.options, {
        where: {
            status: 1
        }
    }).then(ingredients => {
        return JSON.parse(JSON.stringify({data: ingredients, totalPage: Math.ceil(amount / pagination.header.size)}, null, 2));
    });
}

const updateIngredient = async (id, req) => {
    const ingredient = await Ingredient.findOne({
        where:{
            id: id,
            status: 1
        }
    });
    if (!ingredient) {
        return null;
    }

    return Ingredient.update(
        {
            name: req.name
        }, {
        where: {
            id: id
        }
    }).then(res => {
        return res[0]
    });
};

const deleteIngredient = async (id) => {
    const ingredient = await Ingredient.findOne({
        where:{
            id: id,
            status: 1
        }
    });

    if (!ingredient) {
        return null;
    }

    Ingredient.update({ status: 0 }, {
        where: {
            id: id
        }
    }).then(result => {
        return result
    });
};

const reactivateIngredient = async (id) => {
    const ingredient = await Ingredient.findOne({
        where:{
            id: id,
            status: 0
        }
    });

    if (!ingredient) {
        return null;
    }

    Ingredient.update({ status: 1 }, {
        where: {
            id: id
        }
    }).then(result => {
        return result
    });
}

module.exports = { postIngredient, getAllIngredient, updateIngredient, deleteIngredient, reactivateIngredient};