module.exports.postCreate = async function(req, res, next){ 
    var userModel = require('../models/user.model');

    var listError = [];
    var error = [];
    var errorUser = [];
    var errorType = [];
    
    var name = req.body.name;
    var phone = req.body.phone;
    var username = req.body.username;
    var pass = req.body.password;
    var cpass = req.body.cpass;
    try {
    
        var resultUser = await userModel.findOne({username: username});
        if(resultUser){
            errorUser.push('Username exists');
        }
        
        if(!name){
            listError.push('Please enter name');
        }
        if(!phone){
            listError.push('Please enter phone');
        }
        if(!username){
            listError.push('Please enter username');
        }
        if(!pass || !cpass){
            listError.push('Please enter password & confirm password');
        }
        
        if(pass !== cpass){
            error.push('Password & Confirm Password must be same');
        }

        if(typeof parseInt(phone) !== Number){
            errorType.push('Phone must number');
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
        else if(errorType.length){
            res.render('create', {errorType: errorType, values: req.body})
            return;
        }
    } catch (error) {
      console.log('error:', error)
    }
    next();
}