const express = require('express');
const v1CommentRouter = require('./v1/routes/commentRoutes');
const v1RecipeRouter = require('./v1/routes/recipeRoutes');
const v1UserRouter = require("./v1/routes/userRoutes");
const v1IngredientRouter = require("./v1/routes/ingredientRoutes");
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1EmailRouter = require("./v1/routes/emailRoutes");
const v1ScoreRouter = require("./v1/routes/scoreRoutes");
const v1FavoriteRouter = require("./v1/routes/favoriteRoutes");
const v1FollowRouter = require("./v1/routes/followRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use("/api/v1/comment", v1CommentRouter);
app.use("/api/v1/recipe", v1RecipeRouter);
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/ingredient", v1IngredientRouter);
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/email", v1EmailRouter);
app.use("/api/v1/score", v1ScoreRouter);
app.use("/api/v1/favorite", v1FavoriteRouter);
app.use("/api/v1/follow", v1FollowRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});