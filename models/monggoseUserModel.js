const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productID: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
});

UserSchema.methods.addToCart = function (product) {
    const productId = product._id;

    const existingProduct = this.cart.items.find((item) =>
        item.productID.equals(productId)
    );

    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        const newProduct = { productID: productId, qty: 1 };
        this.cart.items.push(newProduct);
    }

    this.cart.totalPrice += +product.price;

};

UserSchema.methods.removeItemsFromcart = function (productId, price) {
    const updatedCartItems = this.cart.items.filter((item) => {
        return item.productID.equals(productId);
    });
    console.log("updatedCartItems", updatedCartItems);
    const updatedTotalPrice = updatedCartItems[0]?.qty || 1 * price;
    this.cart.items = updatedCartItems;
    this.cart.totalPrice = this.cart.totalPrice - updatedTotalPrice;
    return this.save();
};


module.exports = mongoose.model("User", UserSchema);
