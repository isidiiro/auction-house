const express = require('express');
const router = express.Router();
const { getAllProducts, addNewProduct } = require("../controllers/productController")

router.get("/", getAllProducts)
router.post("/new-product", addNewProduct)

module.exports = router