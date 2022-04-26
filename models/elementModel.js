const { DataTypes } = require("sequelize")
const sequelize = require('../pg')

const Element = sequelize.define("Element", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
}, { timestamps: false });

module.exports = Element