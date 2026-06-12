const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("This is the backend")
}

module.exports = {connectDB}
