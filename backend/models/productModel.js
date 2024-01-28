const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    productName: {
        type: String, 
        required: true
    }, 
    cost: {
        type: String,
        required: true
    }, 
    productDescription: {
        type: String,
        required: true
    },
    productImage : {
        type: String,
        required: true
    }
})

module.exports = model("Product", productSchema)