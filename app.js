const express = require ("express");
const path = require("path");

const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const STORE = new SessionStore({
    uri:'mongodb+srv://islam:quran30114@cluster0-t69y4.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection:'sessions'

});

const homeRouter = require('./routes/home.routes');
const productRouter= require('./routes/product.routes');
const authRouter= require('./routes/auth.routes');
const cartRouter = require('./routes/cart.routes');
const adminRouter = require('./routes/admin.routes')
const app = express();

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));
app.use(flash())


app.use(session({
    secret:"this is my secret to hash my password",
    saveUninitialized:false,
    store:STORE,
    resave:true
}))
    


app.use('/',homeRouter);
app.use('/product',productRouter);
app.use('/',authRouter);
app.use('/cart',cartRouter);
app.use('/admin',adminRouter);


app.set('view engine','ejs');
app.set('views','views');

app.get('/',(req,res,next)=>{
    res.render("index");
})
const port = process.env.PORT || 3000; 

app.listen(port,(err)=> {
    console.log(err);
    console.log('server listen on port 3000')
})