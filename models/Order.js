const Sequelize = require("sequelize");
const sequelize = require("../db/sequelize");

const Order = sequelize.define("Orders", {
    productID: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    },

    quantity: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
    },
});

module.exports = Order;
