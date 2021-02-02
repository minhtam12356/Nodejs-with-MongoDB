var session = require('../models/session.model')

module.exports = async function(req, res, next){
    try {
        if(!req.signedCookies.sessionCookie){
            var sessionCookie = await new session().save();
            if (sessionCookie){
                res.cookie('sessionCookie', sessionCookie.id, { signed: true })
                res.redirect('back'); 
            }        
        }
        next()
    } catch (error) {
      console.log('error:', error)
    }
    
    
}