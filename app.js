const express = require('express');

const app = express();
const sequelize = require('./database/db');
const User = require('./database/models/User');

app.listen(3001, () =>{
    console.log("Server running in " + 3001);

    //DB CONNECTION
    sequelize.sync({force: false}).then(() => {
        console.log("Conexión exitosa");
    }).catch(error => {
        console.log("Se ha producido un error");
    });
});

app.get("/", (req, res)=>{
    res.send("Hello world!");
    User.create({
        username: "Anthon",
        birthday: new Date(1983, 4, 6)
    }).then(user => {
        res.json(user);
    });
});