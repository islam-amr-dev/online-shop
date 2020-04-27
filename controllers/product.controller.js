const ProductsModel = require('../models/products.model');
 
exports.getProductDescribtion = (req,res,nxt)=>{
    let id = req.params.id;
    ProductsModel.getProductById(id).then(product=>{
        res.render('product',{
            product:product,
            isUser:true,
            isAdmin:req.session.isAdmin 
        })
    })
}

exports.getProductById = (req,res,next) =>{
    let id = req.params.id;
    ProductsModel.getProductById(id).then(product =>{
        res.render("product",{
            product:product,
            isUser:req.session.isUser,
            isAdmin:req.session.isAdmin,
        });    
    });
};