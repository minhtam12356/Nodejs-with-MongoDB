var express = require('express');
var user = require('../../models/user.model');
var route = express.Router();
var apiController = require('../controller/user.controller');

route.get('/:id', apiController.getUser);
route.post('/', async function(req, res){
    try {
        console.log(req.body);
        
        await user.create(req.body)
    res.json('thanh cong')
    } catch (error) {
        console.log(error);
    }
    

})
module.exports = route;