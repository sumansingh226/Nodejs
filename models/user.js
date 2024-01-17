const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize")


const User = new Sequelize.define("users", {

    id: {
        type: Sequelize.STRING
        autoIncrement: true
    }
})