module.exports.postLogin = async function(req, res, next){
    var userModel = require('../models/user.model');
    var cookieId = req.signedCookies.userCookie;
    if(!cookieId){
        res.redirect('/login')
        return;
    }
    try {
        var userLocals = await userModel.findOne({"_id": cookieId});
        if(!userLocals){
            res.redirect('/login')
            return;
        }
        res.locals.userLocals = userLocals;
        next()
    } catch (error) {
      console.log('error:', error)
    }
    
}
