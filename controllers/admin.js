// const Product = require("../models/product");
const Product = require("../models/seqProduct");

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([products]) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).render("error", {
                pageTitle: "Error",
                errorMessage: "An error occurred while fetching the products.",
            });
        });
};

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
    const { title, description, price, quantity, image } = req.body;
    Product.create({
        title,
        image,
        price,
        quantity,
        description,
    }).then((result) => {
        console.log("result", result).catch((err) => console.log("eer", err));
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productID = req.params.productID;
    Product.fetchById(productID, (product) => {
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            editing: editMode,
            product: product,
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const payload = ({ title, description, price, quantity, image, productID } =
        req.body);
    const product = new Product({ ...payload });
    product.Edit(productID);
    res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
    const { productID } = req.body;
    Product.deleteProduct(productID);
    res.redirect("/admin/products");
};
