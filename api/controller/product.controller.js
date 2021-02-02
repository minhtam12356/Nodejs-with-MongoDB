var product = require('../../models/product.model');
module.exports.product = async function(req, res){
    try {
        var result = await product.find();
        res.json(result)
    } catch (error) {
        console.log('error:', error);
    }
    
    
}