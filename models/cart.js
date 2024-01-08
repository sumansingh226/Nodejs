const fs = require("fs");
const path = require("path");

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addToCart(id, productPrice) {
        fs.readFile(filePath, (err, file) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(file) || cart;
            }

            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.productID == id
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].qty += 1;
            } else {
                cart.products.push({ productID: id, qty: 1 });
            }

            cart.totalPrice += +productPrice;

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    static deleteFromCart(id, productPrice) {
        fs.readFile(filePath, (err, file) => {
            if (err) {
                console.error(err);
                return;
            }

            let cart = { products: [], totalPrice: 0 };
            if (file) {
                cart = JSON.parse(file);
            }

            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.productID == id
            );

            if (existingProductIndex !== -1) {
                const deletedProduct = cart.products[existingProductIndex];
                cart.totalPrice -= deletedProduct.qty * productPrice;
                cart.products.splice(existingProductIndex, 1);
            } else {
                console.log("Product not found in cart.");
            }

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }

    static getAllCartItems(callback) {
        fs.readFile(filePath, (err, file) => {
            if (err) {
                console.error(err);
                callback({ products: [], totalPrice: 0 });
                return;
            }

            let cart = { products: [], totalPrice: 0 };
            if (file) {
                cart = JSON.parse(file);
            }
            callback(cart);
        });
    }

};
