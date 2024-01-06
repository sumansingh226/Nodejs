const path = require("path");
const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/", shopController.getProducts);
router.get("/", shopController.getCart);
router.get("/", shopController.getCheckout);

router.get("/products");
router.get("/cart");
router.get("/checkout");



module.exports = router;
