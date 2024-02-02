const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/authMiddleware")
const router = express.Router();


// /admin/producs => GET
router.get("/products", adminController.getAllProducts);

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);
// /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productID", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct)

module.exports = router;
