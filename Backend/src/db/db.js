const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);



const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB")

};

module.exports = connectDB;