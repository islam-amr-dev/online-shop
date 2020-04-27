const router=require("express").Router();
const authController = require('../controllers/auth.controller');
const bodyParser= require("body-parser");
const check =require("express-validator").check
const authGuards = require("./guards/authGuards")

router.get('/signup',authController.getSignup);


router.post(
    '/signup',authGuards.notAuth , 
    bodyParser.urlencoded({extended:true}),
    check("username").not().isEmpty().withMessage("This field is required"),
    check("email").not().isEmpty().withMessage("This field is required").isEmail().withMessage("Invalid format"),
    check("password").not().isEmpty().withMessage("This field is required").isLength({min:6}),
    check("confirmPassword").custom((value,{req})=>{ 
        if(value === req.body.password) return true
        else throw "passwords don't match"
    }),
    authController.postSignup
);


router.get('/login',
authGuards.notAuth ,  authController.getLogin);

router.post("/login",
authGuards.notAuth , bodyParser.urlencoded({extended:true}),authController.postLogin)

router.all("/logout",authGuards.isAuth , authController.logout);

module.exports = router;