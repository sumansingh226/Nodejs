const Cart = require("../models/cart");
const Product = require("../models/monggosProductSchema");
const User = require("../models/monggoseUserModel");
const Order = require("../models/mongooseOrderModel");

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

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.items.productID")
      .exec();
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Cart Items",
      prods: user.cart.items,
      cart: user.cart,
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
  const { productID, price } = req.body;
  req.user
    .removeItemsFromcart(productID, price)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "My  Orders",
  });
};



exports.postCheckout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.items.productID")
      .exec();

    const products = user.cart.items.map((item) => ({
      quantity: item.qty,
      product: { ...item.productID._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products: products,
    });

    await order.save(); // Wait for the order to be saved
    await req.user.clearCartOnOrder(); // Wait for the cart to be cleared

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "My Orders",
    });
  } catch (error) {
    console.error("Error in postCheckout:", error);
    next(error);
  }
};
