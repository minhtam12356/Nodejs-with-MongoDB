var mongoose = require('mongoose');
var sessionSchema = new mongoose.Schema({
    Cart: [
        {
            ProductID: String,
            Quantity: Number
        }
    ]  
})
var session = mongoose.model("Session", sessionSchema, "session");

module.exports = session;