const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
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
    try {
        if (req.file){
            var upload = await cloudinary.uploader.upload(req.file.path);
            req.body.avatar = upload.url;
        }
        else{
            req.body.avatar = "avatar.png";
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        await userModel.create(req.body);
        res.redirect('/');
    } catch (error) {
      console.log('error:', error)
    }
    
}  
  