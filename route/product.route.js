var express = require('express');
var controller = require('../controller/product.controller');
var route = express.Router();

route.get('/', controller.product)

route.get('/product/:id', controller.detailProduct)

module.exports = route;