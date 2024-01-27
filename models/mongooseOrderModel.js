const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    products: {
        type: Object,
        required: true,
    },
});

module.exports = mongoose.model("Order", orderSchema);
