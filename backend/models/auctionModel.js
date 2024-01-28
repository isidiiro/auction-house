const { Schema, model } = require("mongoose");

const auctionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        unique: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    products: {
        type: [{
            product_Id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }],
        required: true
    }
})

module.exports = model("Auction", auctionSchema)