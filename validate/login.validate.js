module.exports.postLogin = async function(req, res, next){   
    const userModel = require('../models/user.model');
    const bcrypt = require('bcrypt');
    const listError = []

    var searchListUser = req.body.username;
    var searchListPass = req.body.password;
    try {
        let resultUser = await userModel.findOne({username: searchListUser});
        
        if(!resultUser){
            listError.push('Username invalid');
            res.render('login', {errors: listError, values: req.body})
            return;
        }

        let checkPass = await bcrypt.compare(searchListPass, resultUser.password);
        
        if(!searchListUser || searchListUser !== resultUser.username){
            listError.push('Username invalid');
        }
        if(!searchListPass || !checkPass){
            listError.push('Wrong password')
        }
        if(listError.length){
            res.render('login', {errors: listError, values: req.body})
            return;
        }
    } catch (error) {
        console.log('error:', error)
    }
    next();
}