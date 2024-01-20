// const Product = require("../models/product");
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([products]) => {
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
    const { title, description, price, quantity, image } = req.body;
    console.log("req.user", req.user);
    Product.save({
        productID: new Date().getTime().toString(),
        title: title,
        image: image,
        price: price,
        quantity: quantity,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
        // userId: req.user
    })
        .then((result) => {
            console.log("Product Created succesfuly ", result);
            res.redirect("/admin/products")
        })
        .catch((err) => {
            console.log("error", err);
        });
};

exports.getEditProduct = async (req, res, next) => {
    try {
        const editMode = req.query.edit;
        const productID = req.params.productID;
        const [product] = await Product.fetchById(productID);
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            editing: editMode,
            product: product[0],
        });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
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
