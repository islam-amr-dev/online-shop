const ProductsModel = require('../models/products.model');

exports.getHome=(req,res,nxt)=>{    
let validCategories = ['phones','clothes','computers']   
let category = req.query.category;
let productPromise ; 
if(category && validCategories.includes(category))
    productPromise = ProductsModel.getProductByCategory(category)
else productPromise = ProductsModel.getAllProducts();
productPromise.then(products=>{
        res.render('index',{
            products:products,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            validationErrors:req.flash("validationErrors")[0]
        })
    })   

}
