var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String
})
var product = mongoose.model("Product", productSchema, "product");

module.exports = product;