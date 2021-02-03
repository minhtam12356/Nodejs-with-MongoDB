var userModel = require('../models/user.model');

var md5 = require('md5');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports.create = function(req, res){
    res.render('create')
}

module.exports.postCreate = async function(req,res){
    delete req.body.cpass;

    if (req.file){
        var upload = await cloudinary.uploader.upload(req.file.path);
        req.body.avatar = upload.url;
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
  