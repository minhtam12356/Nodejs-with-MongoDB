var sessionModel = require('../models/session.model');

module.exports.cart = async function(req, res){
    var productid = req.params.productid;
    var sessionID = req.signedCookies.sessionCookie;

    if(!sessionID){
        res.redirect('back');
        return;
    }
    try {
    
    } catch (error) {
      console.log('error:', error)
    }
    var session = await sessionModel.findOne({"_id" : sessionID});
    if(!session){
        await new sessionModel({
            id : sessionID,
            Cart: [
                {
                    ProductID: productid,
                    Quantity: 1
                }
            ] }).save();
    }
    var findSession = session.Cart.find(function(session){
        return session.ProductID === productid
    })
    if(findSession){
        findSession.Quantity += 1;
        session.save();
        console.log(findSession)
    }    
    else{
        try {
            await sessionModel.updateOne({"_id" : sessionID}, {$push : {Cart : [{ProductID : productid, Quantity : 1}]}});
            
        } catch (error) {
            console.log('error:', error)
        }

    }
    
    res.redirect('back');
}