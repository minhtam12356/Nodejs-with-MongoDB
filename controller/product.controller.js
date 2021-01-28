var product = require('../models/product.model');
var sessionModel = require('../models/session.model');

module.exports.product = async function(req, res){  
    var page = req.query.page || 1;
    var productModel = require('../models/product.model');
    var products = [];
    var numbers = []
    var cartIDproducts = await sessionModel.findOne({_id : req.signedCookies.sessionCookie});
    if(cartIDproducts){
        for(var cartIDproduct in cartIDproducts.Cart){

            //find product name by id in cart
            var getProduct = await productModel.findOne({_id : cartIDproducts.Cart[cartIDproduct].ProductID});
            getProduct['quantity']= cartIDproducts.Cart[cartIDproduct].Quantity;
            products.push(getProduct);
            numbers.push(cartIDproducts.Cart[cartIDproduct].Quantity);
            
        }
        var number = numbers.reduce((a,b)=>a+b)
        res.locals.number = number
    }
    var products = await product.find().skip((page - 1)*4).limit(4);
    var productModel = await product.find();
    if (products){
            res.render('product', {
                products: products
                , page: req.query.page
                , next: parseInt(req.query.page) + 1
                , previous: parseInt(req.query.page) - 1
                , productLength: productModel.length});
        }
}

module.exports.search = async function(req, res){ 
    var search = req.query.q;
    var products = await product.find();
    var result = products.filter(function(product){
        return product.name.toLowerCase().includes(search.toLowerCase()) === true;
    })
        res.render('product', {products: result, value: search})
    
    
}