const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize")


const User = new sequelize.define("Users", {

    id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    }
})