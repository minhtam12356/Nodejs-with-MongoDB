var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    username: String,
    password: String,
    avatar: String
})
var user = mongoose.model("User", userSchema, "user");

module.exports = user;