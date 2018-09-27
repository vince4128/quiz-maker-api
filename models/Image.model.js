const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    title:String,
    image:String,
    date: { type: Date, default: Date.now }
});

const Image = mongoose.model("Image",imageSchema);

module.exports = Image;