const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Product = sequelize.define('Products', {
    productID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(56),
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING(5000),
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
