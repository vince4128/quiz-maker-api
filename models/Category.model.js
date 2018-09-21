const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title:{type:String, unique:true},
    description:String,
    shortDescription:String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;