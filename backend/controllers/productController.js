const productModels = require("../models/productModel")

const getAllProducts = async(req, res) => {
    try {
        const allAuctions = await productModels.find({})
        res.status(200).json(allAuctions)
    } catch (error) {
        res.status(500).json({error})
    }
}

const addNewProduct = async(req, res) => {
    try {
        const newProduct = new productModels({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productImage: req.body.productImage,
            cost: req.body.cost
        })

        await newProduct.save()
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAllProducts,
    addNewProduct
}