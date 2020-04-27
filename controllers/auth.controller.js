const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult


exports.getSignup = (req,res,next)=>{
    res.render("signup",{
        authError:req.flash("authError")[0],
        validationErrors:req.flash("validationErrors") ,
        isUser:false,
        isAdmin:false
    });
}

exports.postSignup = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        authModel.createNewUser(req.body.username,req.body.email,req.body.password)
        .then(()=>res.redirect('/login'))
        .catch(err=>{
            req.flash("authError",err);
            res.redirect('/signup');
        })
   
    }else{
        req.flash("validationErrors",validationResult(req).array())
        res.redirect('/signup');
    }
         
} 

exports.getLogin = (req,res,next)=>{
    res.render("login",{
        authError:req.flash("authError")[0],
        validationErrors:req.flash("validationErrors"),
        isUser : false,
        isAdmin:false
        
    });
}

exports.postLogin=(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        authModel.logInUser(req.body.email,req.body.password).then((result)=>{
            req.session.userId=result.id;
            req.session.isAdmin = result.isAdmin;
            res.redirect("/")
        }).catch(err=>{
            console.log(err);
            req.flash("authError",err)
            res.redirect("/login");

        })
    }else{
        req.flash("validationErrors",validationResult(req).array());
        req.redirect("/login");
    }
}

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
}