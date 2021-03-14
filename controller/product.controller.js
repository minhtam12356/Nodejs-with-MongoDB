const productModel = require('../models/product.model');

module.exports.product = async function(req, res){
        res.render('product');
}

module.exports.detailProduct = async function(req, res){
        try {
                let id = req.params.id;
                console.log('id là:', id);
                let product = await productModel.findById(id);
                res.render('detailProduct', {product : product})   
        } catch (error) {
                console.log(error);
        }
    
}

