const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJWT = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(403).send('Access denied');
    }

    jwt.verify(accessToken, process.env.SECRET, (err, data) => {
        if (err) {
            return res.status(403).send('Access denied, token expired or incorrect');
        } else {
            req.data = data;
            next();
        }
    });
}

const validateAdmin = async (req, res, next) => {
    if (req.data.permission == 'Admin') {
        console.log("you are admin");
        next();
    } else {
        console.log("you are not admin");
        return res.status(403).send("You don't have admin permissions");
    }
}

const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '8h' });
}

module.exports = { validateJWT, validateAdmin, generateAccessToken };