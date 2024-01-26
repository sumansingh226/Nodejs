const path = require("path");
const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/product/:productID", shopController.getProductById)
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.addToCart);
router.post("/remove-cart", shopController.removeFromCart);
router.get("/orders", shopController.getOrders);
router.post("/checkout", shopController.postCheckout);


module.exports = router;
