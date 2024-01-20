const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
    },
});

module.exports = User;
