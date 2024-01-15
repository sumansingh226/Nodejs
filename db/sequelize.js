const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodejsmysql", "root", "Chauhan@#$1234",
    {
        dialect: "sql",
        host: "localhost"

    });

module.exports = sequelize;

