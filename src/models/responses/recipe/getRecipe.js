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

    constructor(recipe, user) {
        this.id = recipe.id;
        this.user.id = user.id;
        this.user.username = user.username;
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

module.exports = { GetRecipeResponse };