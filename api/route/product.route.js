var express = require('express');
var product = require('../../models/product.model');
var route = express.Router();
var apiController = require('../controller/product.controller');

route.get('/', apiController.product);
route.post('/', async function(req, res){
    try {
        console.log(req.body);
        
        await product.create(req.body)
    res.json('thanh cong')
    } catch (error) {
        console.log(error);
    }
    

})
module.exports = route;