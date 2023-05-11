const { GetRecipeResponse } = require("../recipe/getRecipe");

/**
 * @class GetFavoriteResponse : Clase que define la respuesta del Modelo de Favorite para su uso en front
 */
class GetFavoriteResponse {
    id;
    recipe;

    constructor(favorite) {
        this.id = favorite.id;
        this.recipe = new GetRecipeResponse(favorite.recipe);
    }
}

/**
 * 
 * @param {*} favorites : receta(s) favorita(s) a mappear
 * @returns mappedList: receta(s) favorita(s) mappeada(s) para la implementación de front
 */
function MapListFavorite(favorites) {
    const mappedList = [];
    favorites.forEach(favorite => {
        mappedList.push(new GetFavoriteResponse(favorite));
    });
    return mappedList;
}

module.exports = { GetFavoriteResponse, MapListFavorite };