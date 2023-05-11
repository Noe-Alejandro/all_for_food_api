const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

/**
 * Follow: Modelo que representa la entidad de la base de datos para los usuarios seguidos por un usuario
 * 
 * @property { INTEGER } id : el identificador de la relación follow 
 * @property { INTEGER } userId : el identificador del usuario follower
 * @property { INTEGER } followerId : el identificador del usuario al que sigue
 * 
 * Belongs to: User (as follower), User (as following)
 */
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