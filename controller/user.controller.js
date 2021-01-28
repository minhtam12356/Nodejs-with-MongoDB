var userModel = require('../models/user.model');
var sessionModel = require('../models/session.model');
var productModel = require('../models/product.model');


module.exports.user = async function(req,res){
    var users = await userModel.find()
    if(users){
        res.render('user', {users: users})
    } 
}

module.exports.search = async function(req, res){
    var searchList = req.query.q;
    var users = await userModel.find();
    var result = users.filter(function(user){
        return user.username.toLowerCase().includes(searchList.toLowerCase()) === true;
    })
    if(result){
        res.render('user', {users: result, value: searchList});
    }
    
}

module.exports.view = async function(req, res){
    var id = req.params.id;
    var user = await userModel.findOne({_id: id});
    if(user){
        res.render('view', {user: user});
    }
    
}

module.exports.cart = async function(req, res){
    var products = [];
    var numbers = [];

    //sum
    var sumPQ = [];
    var sumPrice = [];
    var sumQuantity = [];

    var cartIDproducts = await sessionModel.findOne({_id : req.signedCookies.sessionCookie});
    for(var cartIDproduct in cartIDproducts.Cart){

        //find product name by id in cart
        var getProduct = await productModel.findOne({_id : cartIDproducts.Cart[cartIDproduct].ProductID});
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
}
