/**
 * @class GetRecipeResponse : Clase que define la respuesta del Modelo de Recipe para su uso en front
 */
class GetRecipeResponse {
    id
    user = {
        id: null,
        username: null
    };
    title;
    image;
    description;
    steps;
    rate;
    createdAt;
    modifiedAt;
    status;

    constructor(recipe) {
        this.id = recipe.id;
        this.user.id = recipe.user.id;
        this.user.username = recipe.user.username;
        this.title = recipe.title;
        this.image = recipe.image;
        this.description = recipe.description;
        this.steps = recipe.steps;
        this.rate = recipe.rate;
        this.createdAt = recipe.createdAt;
        this.modifiedAt = recipe.modifiedAt;
        this.status = recipe.status;
    }
}

/**
 * 
 * @param {*} recipes : Receta(s) a mappear
 * @returns mappedList: Receta(s) mappeada(s) para la implementación de front
 */
function MapListRecipes(recipes) {
    const mappedList = [];
    recipes.forEach(recipe => {
        mappedList.push(new GetRecipeResponse(recipe));
    });
    return mappedList;
}

module.exports = { GetRecipeResponse, MapListRecipes };