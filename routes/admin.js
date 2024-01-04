const path = require('path');

const express = require('express');
const { addProducts, getAddProducts, postAddProducts } = require('../controller/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProducts);

exports.routes = router;
exports.products = products;
