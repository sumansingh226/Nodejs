const fs = require("fs");
const path = require("path");
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
        isAuthenticated: req.session.isLoggedIn,
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
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken(),
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
      isAuthenticated: req.session.isLoggedIn,
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

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.user._id
    const products = await Order.find({});
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "My  Orders",
      orders: products,
      isAuthenticated: req.session.isLoggedIn,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.postCheckout = async (req, res, next) => {
  try {
    const email = req.user.email;
    const id = req.user._id;
    const user = await User.findById(id)
      .populate("cart.items.productID")
      .exec();
    const products = user.cart.items.map((item) => ({
      quantity: item.qty,
      product: { ...item.productID._doc },
    }));

    const order = new Order({
      user: {
        email: email,
        userId: id,
      },
      products: products,
    });
    const orderSaveResult = await order.save();
    const clearCartResult = await req.user.clearCartOnOrder();
    if (orderSaveResult && clearCartResult) {
      const productsOrders = await Order.find({ "user.userId": req.user._id });
      return res.render("shop/orders", {
        path: "/orders",
        pageTitle: "My Orders",
        isAuthenticated: req.session.isLoggedIn,
        orders: productsOrders,
      });
    } else {
      throw new Error('Failed to save order or clear cart');
    }
  } catch (error) {
    console.error("Error in postCheckout:", error);
    next(error);
  }
};



exports.getOrderInvoice = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId)
    const invoiceName = 'invoice-' + orderId + ".pdf";
    const invoicePath = path.join('data', 'invoices', invoiceName);
    fs.readFile(invoicePath, (err, data) => {
      if (err) {
        return next(err);
      }
      else {
        res.set('Content-Type', 'application/pdf');
        res.status(200).send(data);
      }
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}

