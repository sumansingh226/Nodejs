const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    const productID = new Date().getTime();
    const payload = ({ title, description, price, quantity, image } = req.body);
    const product = new Product({ ...payload, productID });
    product.save();
    res.redirect("/");
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(product => {
        res.render("admin/products",
            {
                pros: product,
                pageTitle: "Admin Products",
                path: "/admin/products"
            })
    })
}
