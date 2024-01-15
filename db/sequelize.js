const Sequelize = require("sequelize");
const sequelize = new Sequelize('nodejsmysql', 'root', 'Chauhan@#$1234', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

