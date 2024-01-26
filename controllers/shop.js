const Cart = require("../models/cart");
const Product = require("../models/monggosProductSchema");
const User = require("../models/monggoseUserModel");


exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
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

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
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



exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.items.productID').exec();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Cart Items",
      prods: user.cart.items,
      cart: user.cart
    });
  } catch (err) {
    console.error("err", err);
    res.status(500).send("Internal Server Error");
  }
};


exports.addToCart = (req, res, next) => {
  const { productID } = req.body;
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return res.status(404).send("Product not found");
      }
      req.user.addToCart(product);
      return req.user.save();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error("Error adding to cart:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.removeFromCart = (req, res, next) => {
  const { productID } = req.body;
  console.log("redbody productID", productID);
  req.user.removeItemFromcart(productID).then(() => {
    res.redirect("/cart");

  })
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "My  Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
exports.getProductById = (req, res, next) => {
  const { productID } = req.params;
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return res.status(404).render("error", {
          pageTitle: "Product Not Found",
          errorMessage: "The requested product could not be found.",
        });
      }
      const { title } = product;
      res.render("shop/product-detail", {
        path: "/products",
        pageTitle: title,
        product: product,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render("error", {
        pageTitle: "Error",
        errorMessage: "An error occurred while fetching the product.",
      });
    });
};
