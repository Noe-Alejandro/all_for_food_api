const express = require('express');
const v1CommentRouter = require('./v1/routes/commentRoutes');
const v1UserRouter = require("./v1/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1/comment", v1CommentRouter);
app.use("/api/v1/user", v1UserRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});