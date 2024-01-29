const express = require('express');
const router = express.Router();
const { getAllAuctions, addNewAuction } = require("../controllers/auctionController.js")

router.get("/", getAllAuctions)
router.post('/new-auction', addNewAuction)

module.exports = router