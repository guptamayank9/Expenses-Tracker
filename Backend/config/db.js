const mongoose = require("mongoose");
//mongodb connection
async function connectDB(params) {
    try {
        await mongoose.connect(process.env.MONGO_URI);
         console.log("Mongodb connected Successfully");
    } catch (error) {
    console.log("Mongodb connection Failed");
    console.log(error.message);
    process.exit(1);
    }
}

module.exports = connectDB;