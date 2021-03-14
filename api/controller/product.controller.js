const product = require('../../models/product.model');

module.exports.getProduct = async function(req, res){
    try {
        let products = await product.find();
        return res.json(products.length)
    } catch (error) {
        return res.status(500).send(error);
    }
    
}

module.exports.getProductById = async function(req, res){
    try {
        let id = req.query.page;
        let products = await product.find();
        let perPage = 8;
        let start = (id - 1) * perPage;
        let end = start + perPage;
        let page = Math.round(products.length/8);
        if(id > page || id <= 0){  
            return res.send('Không tìm thấy kết quả nào!!')
        }
        let result = products.slice(start, end);
        return res.json(result)
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.postProduct = async function(req, res){
    try {
        console.log(req.body);
        
        await product.create(req.body)
    res.json('thanh cong')
    } catch (error) {
        return res.status(500).send(error);
    }
    

}

module.exports.searchProduct = async function(req, res){
    try {
        let name = req.query.q;
        let products = await product.find();
        let result = products.filter(function(product){
            return product.name.toLowerCase().includes(name.toLowerCase()) === true;
        })
        return res.send(result);    
    } catch (error) {
        return res.status(500).send(error);
    }
       
}