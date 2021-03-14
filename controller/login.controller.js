var userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');

module.exports.login = async function(req, res){
        res.render('login')  
}

module.exports.postLogin = async function(req,res){
    var searchListUser = req.body.username;
    try {
        var resultUser = await userModel.findOne({username: searchListUser});
        var token = jwt.sign({_id : resultUser.id}, 'tamnguyen')
        res.cookie('userCookie', resultUser.id, { expires: new Date(Date.now() + 9000000), signed: true })
        res.cookie('userToken', token, { expires: new Date(Date.now() + 9000000)}) 

        res.redirect('/home');
    
    } catch (error) {
        console.log('error:', error)
    }
    
    
}

module.exports.signOut = function(req, res){
    res.clearCookie('userCookie')
    res.clearCookie('userToken')
    res.redirect('/');
}
  