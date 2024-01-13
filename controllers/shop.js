const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  }).catch((err) => {
    console.log(err);
  })

};

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    Cart.getAllCartItems((cart) => {
      const matchedProducts = [];
      for (let cartProduct of cart.products) {
        const foundProduct = products.find(
          (product) => product.productID == cartProduct.productID
        );

        if (foundProduct) {
          matchedProducts.push(foundProduct);
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart Items",
        prods: matchedProducts,
        cart: cart,
      });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const { productID } = req.body;
  Product.fetchById(productID, (product) => {
    Cart.addToCart(product.productID, product.price);
    res.redirect("/cart");
  });
};

exports.removeFromCart = (req, res, next) => {
  const { productID } = req.body;
  Product.fetchById(productID, (product) => {
    Cart.removeFromCart(product.productID, product.price);
    res.redirect("/cart");
  });
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
  Product.fetchById(productID, (product) => {
    res.render("shop/product-detail", {
      path: "/products",
      pageTitle: product.title,
      product: product,
    });
  });
};
