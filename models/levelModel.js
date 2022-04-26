const { DataTypes } = require("sequelize")
const sequelize = require('../pg')


const Level = sequelize.define("Level", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    levelID: DataTypes.INTEGER
    // dataObjectID: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true }
}, { timestamps: false });



module.exports = Level