module.exports.postLogin = async function(req, res, next){
    var userModel = require('../models/user.model');
    var cookieId = req.signedCookies.userCookie;
    if(!cookieId){
        res.redirect('/login')
        return;
    }

    var userLocals = await userModel.findOne({_id: cookieId});
    if(!userLocals){
        res.redirect('/login')
        return;
    }
    res.locals.userLocals = userLocals;
    next()
}
module.exports.product = async function(req, res, next){
    var userModel = require('../models/user.model');
    var cookieId = req.signedCookies.userCookie;
    var userLocals = await userModel.findOne({_id: cookieId});
    res.locals.userLocals = userLocals;
    next()
}