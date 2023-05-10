const { GetRecipeResponse } = require("../recipe/getRecipe");

class GetFavoriteResponse {
    id;
    recipe;

    constructor(favorite) {
        this.id = favorite.id;
        this.recipe = new GetRecipeResponse(favorite.recipe);
    }
}

function MapListFavorite(favorites) {
    const mappedList = [];
    favorites.forEach(favorite => {
        mappedList.push(new GetFavoriteResponse(favorite));
    });
    return mappedList;
}

module.exports = { GetFavoriteResponse, MapListFavorite };