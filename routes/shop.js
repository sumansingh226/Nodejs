const express = require("express");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/product/:productID", shopController.getProductById)
router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.addToCart);
router.post("/remove-cart", isAuth, shopController.removeFromCart);
router.get("/orders", isAuth, shopController.getOrders);
router.post("/create-order", isAuth, shopController.postCheckout);
router.post("/orders/:orderId", isAuth, shopController.getOrderInvoice);


module.exports = router;
