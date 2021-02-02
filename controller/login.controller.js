var userModel = require('../models/user.model');

module.exports.login = async function(req, res){
        res.render('login')  
}

module.exports.postLogin = async function(req,res){
    var searchListUser = req.body.username;
    try {
        var resultUser = await userModel.findOne({username: searchListUser});
        res.cookie('userCookie', resultUser.id, { signed: true })
        res.redirect('/home');
    
    } catch (error) {
        console.log('error:', error)
    }
    
    
}

module.exports.signOut = function(req, res){
    res.clearCookie('userCookie')
    res.redirect('/');
}
  