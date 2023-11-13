const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');   // Atlas URL

const connectdb = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error:"));
    db.once('open', () => {
        console.log("\nDB connected\nEnjoy Surfing");
    });
}

module.exports = connectdb;