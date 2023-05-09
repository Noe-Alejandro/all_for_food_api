const express = require('express');
const v1CommentRouter = require('./v1/routes/commentRoutes');
const v1RecipeRouter = require('./v1/routes/recipeRoutes');
const v1UserRouter = require("./v1/routes/userRoutes");
const v1IngredientRouter = require("./v1/routes/ingredientRoutes");
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1EmailRouter = require("./v1/routes/emailRoutes");
let cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(require('./v1/routes/emailRoutes'));

app.use("/api/v1/comment", v1CommentRouter);
app.use("/api/v1/recipe", v1RecipeRouter);
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/ingredient", v1IngredientRouter);
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/email", v1EmailRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});