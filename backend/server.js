const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db");
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})