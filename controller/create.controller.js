var userModel = require('../models/user.model');
var md5 = require('md5');

module.exports.create = function(req, res){
    res.render('create')
}

module.exports.postCreate = async function(req,res){
    delete req.body.cpass;

    if (req.file){
        req.body.avatar = (req.file.destination + req.file.filename).split('/').slice(2, 4).join('/');
    }
    else{
        req.body.avatar = "avatar.png";
    }
    

    req.body.password = md5(req.body.password)
    try {
        await userModel.create(req.body);
        res.redirect('/');
    } catch (error) {
      console.log('error:', error)
    }
    
}  
  