const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
    console.log("Connected to DB");
})

const schema = new mongoose.Schema({
    text: String,
    createdAt: String,
    createdBy: String
    
})


module.exports = mongoose.model("Message", schema);