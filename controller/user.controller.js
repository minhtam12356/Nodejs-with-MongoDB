var userModel = require('../models/user.model');
var sessionModel = require('../models/session.model');
var productModel = require('../models/product.model');


module.exports.user = async function(req,res){
    try {
        var users = await userModel.find()
        if(users){
            res.render('user', {users: users})
        } 
    } catch (error) {
      console.log('error:', error)
    }
    
}

module.exports.search = async function(req, res){
    var searchList = req.query.q;
    try {
        var users = await userModel.find();
        var result = users.filter(function(user){
            return user.username.toLowerCase().includes(searchList.toLowerCase()) === true;
        })
        if(result){
            res.render('user', {users: result, value: searchList});
        }
    } catch (error) {
      console.log('error:', error)
    }
    
    
}

module.exports.view = async function(req, res){
    var id = req.params.id;
    try {
        var user = await userModel.findOne({_id: id});
        if(user){
            res.render('view', {user: user});
    }
    } catch (error) {
      console.log('error:', error)
    }
    
    
    
}

module.exports.cart = async function(req, res){
    var products = [];
    var numbers = [];

    //sum
    var sumPQ = [];
    var sumPrice = [];
    var sumQuantity = [];
    try {
    
        var cartIDproducts = await sessionModel.findOne({"_id" : req.signedCookies.sessionCookie});
        for(var cartIDproduct in cartIDproducts.Cart){
    
            //find product name by id in cart
            var getProduct = await productModel.findOne({"_id" : cartIDproducts.Cart[cartIDproduct].ProductID});
            getProduct['quantity']= cartIDproducts.Cart[cartIDproduct].Quantity;
            products.push(getProduct);
            numbers.push(cartIDproducts.Cart[cartIDproduct].Quantity);
            
            //sum
            sumPrice.push(parseInt(getProduct.price));
            sumQuantity.push(getProduct.quantity);
        }
    
        //sum
        for(var i = 0; i < sumPrice.length; i++){
            var sumLoop = sumPrice[i] * sumQuantity[i];
            sumPQ.push(sumLoop);
        }
        var sum = sumPQ.reduce((a,b)=>a+b);
        var number = numbers.reduce((a,b)=>a+b);
        res.render('cart', {carts : products
                         , number : number
                         , sum : sum
                        });
    } catch (error) {
      console.log('error:', error)
    }
}
