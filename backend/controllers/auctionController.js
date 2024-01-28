const auctionModels = require("../models/auctionModel")

const getAllAuctions = async(req, res) => {
    try {
        const allAuctions = await auctionModels.find({})
        res.status(200).json(allAuctions)
    } catch (error) {
        res.status(500).json({error})
    }
}

const addNewAuction = async(req, res) => {
    try {
        const newAuction = new auctionModels({
            name : req.body.name,
            description: req.body.description,
            image: req.body.image,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            products: req.body.products
        })

        await newAuction.save()
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    getAllAuctions,
    addNewAuction
}