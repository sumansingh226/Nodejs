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
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productID = req.params.productID;
    Product.fetchById(productID, product => {
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            editing: editMode,
            product: product
        });
    })

};

exports.postEditProduct = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    res.redirect("/")
}
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
                prods: product,
                pageTitle: "Admin Products",
                path: "/admin/products"
            })
    })
}
