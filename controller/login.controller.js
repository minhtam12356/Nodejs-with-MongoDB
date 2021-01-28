var userModel = require('../models/user.model');

module.exports.login = async function(req, res){
        res.render('login')  
}

module.exports.postLogin = async function(req,res){
    var searchListUser = req.body.username;
    var resultUser = await userModel.findOne({username: searchListUser});
    if(resultUser){
        res.cookie('userCookie', resultUser.id, { signed: true })
        res.redirect('/home');
    }
    
}

module.exports.signOut = function(req, res){
    res.clearCookie('userCookie')
    res.redirect('/');
}
  