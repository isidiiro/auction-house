const mongoose = require('mongoose');

const connectDB = async () => {
    const URI = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(URI, {
        useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
