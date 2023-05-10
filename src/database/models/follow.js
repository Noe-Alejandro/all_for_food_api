const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Follow = sequelize.define("follows",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        followId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "follows",
    tableName: "follows",
    timestamps: false
});

Follow.belongsTo(User, { as: 'follower', foreignKey: 'userId' });
Follow.belongsTo(User, { as: 'following', foreignKey: 'followId' });

module.exports = Follow;