const User = require('../database/models/user');

const authUser = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    });
    if (user) {
        return JSON.parse(JSON.stringify(user, null, 2));
    }
}

const authToken = async (id) => {
    const user = await User.findOne({
        where: {
            id: id
        }
    });
    if (user) {
        return JSON.parse(JSON.stringify(user, null, 2));
    }
}

module.exports = { authUser, authToken };