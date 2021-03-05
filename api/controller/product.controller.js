var product = require('../../models/product.model');
module.exports.getProduct = async function(req, res){
    try {
        var id = req.query.page;
        var products = await product.find();
        var perPage = 4;
        var start = (id - 1) * perPage;
        var end = start + perPage;
        var page = Math.round(products.length/4);
        if(id > page || id <= 0){  
            return res.send('Không tìm thấy kết quả nào!!')
        }
        var result = products.slice(start, end);
        return res.json(result)
    } catch (error) {
        return res.status(500).send(error);
    }
    
    
}