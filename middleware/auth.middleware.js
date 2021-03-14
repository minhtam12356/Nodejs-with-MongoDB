var jwt = require('jsonwebtoken');
var user = require('../models/user.model');
module.exports.auth = async function(req, res, next){
    try {
        var id = req.url.slice(1)       // id user
        var token = req.cookies.userToken;
        var decoded = jwt.verify(token, 'tamnguyen')
        var check = await user.findById(decoded);      //find user

        if(!check || check.id !== id){
            res.status(500).send('no data!!')
            return;
        }
        next()
    } catch (error) {
        res.status(500).send(error)
    }
    
    
}