module.exports.postCreate = function(req, res, next){ 
    var db = require('../db');

    var listError = [];
    var error = [];
    var errorUser = [];

    var name = req.body.name;
    var phone = req.body.phone;
    var username = req.body.username;
    var pass = req.body.password;
    var cpass = req.body.cpass;

    var resultUser = db.get('listUser').find({username: username}).value()

    if(!name){
        listError.push('Please enter name');
    }
    if(!phone){
        listError.push('Please enter phone')
    }
    if(!username){
        listError.push('Please enter username');
    }
    if(!pass || !cpass){
        listError.push('Please enter password & confirm password')
    }
    
    if(pass !== cpass){
        error.push('Password & Confirm Password must be same');
    }
    if(resultUser){
        errorUser.push('Username exists');
    }
    
    if(listError.length){
        res.render('create', {errors: listError, values: req.body})
        return;
    }
    else if(error.length){
        res.render('create', {error: error, values: req.body})
        return;
    }
    else if(errorUser.length){
        res.render('create', {errorUser: errorUser, values: req.body})
        return;
    }
    next();
}