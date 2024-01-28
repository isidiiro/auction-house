const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db");
const userRoutes = require('./routes/userRoutes');
const auctionRoutes = require("./routes/auctionRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);
app.use("/api/auctions", auctionRoutes)
app.use("/api/products", productRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})