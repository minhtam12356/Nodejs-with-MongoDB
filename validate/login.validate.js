module.exports.postLogin = async function(req, res, next){   
    var userModel = require('../models/user.model');
    var md5 = require('md5');
    var listError = []

    var searchListUser = req.body.username;
    var searchListPass = req.body.password;
    var resultUser = await userModel.findOne({username: searchListUser});
    if(!resultUser){
        listError.push('Username invalid');
        res.render('login', {errors: listError, values: req.body})
        return;
    }
    if(!searchListUser || searchListUser !== resultUser.username){
        listError.push('Username invalid');
    }
    if(!searchListPass || md5(searchListPass) !== resultUser.password){
        listError.push('Wrong password')
    }
    if(listError.length){
        res.render('login', {errors: listError, values: req.body})
        return;
    }
    next();
}