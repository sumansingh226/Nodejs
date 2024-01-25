// const Product = require("../models/product");
const Product = require("../models/monggosProductSchema");

exports.getAllProducts = (req, res, next) => {
    Product.find().populate('userID', 'name')
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true,
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
    const product = new Product({ ...req.body, userID: req.user._id });

    product.save()
        .then((result) => {
            console.log("Product Created successfully", result);
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log("Error creating product", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


exports.getEditProduct = async (req, res, next) => {
    try {
        const editMode = req.query.edit;
        const productID = req.params.productID;
        const product = await Product.findById(productID)
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            editing: editMode,
            product: product,
        });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
};


exports.postEditProduct = async (req, res, next) => {
    const payload = ({ title, description, price, quantity, image, productID } =
        req.body);
    try {
        await Product.findByIdAndUpdate(productID, payload, { new: false });
        res.redirect("/admin/products");
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

exports.postDeleteProduct = async (req, res, next) => {
    try {
        const { productID } = req.body;
        await Product.findByIdAndDelete(productID);
        res.status(200).redirect("/admin/products");
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
    }

};
