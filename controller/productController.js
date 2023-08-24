
const Products = require('../model/products').Products;

exports.getProducts = async (req, res) => {
 const filter = {};
 if(req.query) {
    filter = req.query;
 }

 const products = await Products.find(filter);
 if(!products) res.status.send("No product available");

 res.status(200).send(products);
}


exports.boughtProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}