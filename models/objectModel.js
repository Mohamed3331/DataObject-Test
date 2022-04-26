const { DataTypes } = require("sequelize")
const sequelize = require('../pg')

const DataObject = sequelize.define("DataObject", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: DataTypes.STRING,

}, { timestamps: false });

module.exports = DataObject
