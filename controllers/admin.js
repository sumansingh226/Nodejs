// const Product = require("../models/product");
const Product = require("../models/monggosProductSchema");
const { default: deleteFile } = require("../util/fileHandlers");

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
                isAuthenticated: req.session.isLoggedIn,
                csrfToken: req.csrfToken(),
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
    if (req.session.isLoggedIn !== true) {
        return res.redirect("/login")
    }
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken(),
        errorMessage: ""
    });
};

exports.postAddProduct = (req, res, next) => {
    const payload = req.body;
    payload.image = req.file.path.replace('public\\', '');
    let product = new Product({ ...payload, userID: req.user._id });
    if (!req.body.iamge) {
        req.flash("invalid Input ");

    }
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
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken(),
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
        const product = await Product.findById(productID);
        if (!product) {
            throw new Error("Product not found");
        }

        await deleteFile(product.imageUrl);
        await Product.findByIdAndDelete(productID);

        console.log('Product deleted successfully');
        res.status(200).redirect("/admin/products");
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send("Error deleting product");
    }
};
