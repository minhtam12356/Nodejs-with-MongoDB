var express = require('express');
var route = express.Router();
var apiController = require('../controller/product.controller');

route.get('/', apiController.getProduct);

route.get('/search', apiController.searchProduct);

route.get('/:id', apiController.getProductById);

route.post('/add', apiController.postProduct);

module.exports = route;