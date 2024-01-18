const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize")


const User = new sequelize.define("Users", {

    id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(20),
        allowNull: false,
    }
})