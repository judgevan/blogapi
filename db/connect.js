const mongoose = require('mongoose');
require("dotenv").config()
//so we can use our .env file we created

const connectDB = async () => {
    const db = await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connected to DB")
    }).catch(err => console.log("error connecting"))

    return db
}

module.exports = connectDB