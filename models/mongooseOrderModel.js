const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    product: {
        type: Object,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }
})

model.exports = mongoose.model("Order", orderSchema);