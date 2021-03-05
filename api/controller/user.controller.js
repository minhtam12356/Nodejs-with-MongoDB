var user = require('../../models/user.model');
module.exports.getUser = async function(req, res){
    try {
        var users = await user.findOne({_id : req.params.id});
        var result = users;
        return res.json(result)
    } catch (error) {
        return res.status(500).send(error);
    } 
}