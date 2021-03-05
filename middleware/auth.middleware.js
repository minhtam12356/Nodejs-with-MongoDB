var jwt = require('jsonwebtoken');
var user = require('../models/user.model');
module.exports.auth = async function(req, res, next){
    try {
        var id = req.url.slice(1)
        var token = req.cookies.userToken;
        var decoded = jwt.verify(token, 'tamnguyen')
        var check = await user.findById(decoded);
        console.log('check:', check)

        if(!check || check.id !== id){
            res.status(500).send('no data!!')
            return;
        }
        next()
    } catch (error) {
        res.status(500).send(error)
    }
    
    
}