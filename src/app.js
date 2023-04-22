const express = require('express');
const v1CommentRouter = require('./v1/routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1/comment", v1CommentRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});