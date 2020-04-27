const DB_URL = 'mongodb+srv://islam:quran30114@cluster0-t69y4.mongodb.net/online-shop?retryWrites=true&w=majority';
const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }

});

const User = mongoose.model('user',userSchema);


exports.createNewUser= (username,email,password)=>{
    return  new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL, { useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
                return User.findOne({email:email});
            }).then(user=>{
                if(user){
                mongoose.disconnect();
                    reject("the email you entered  is used before try another one");
                }else{
                    return bcrypt.hash(password,10);
                } 
                
            }).then(hashedPassword => {
                let user = new User({
                    username:username,
                    email:email,
                    password:hashedPassword
                })
                return user.save()
                
            }).then(()=>{
                mongoose.disconnect();
                resolve()
            }).catch(err=>{
                console.log("Connected");
                mongoose.disconnect();
                reject(err);
            });
        });
    
};

exports.logInUser = (email,password)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true })
        .then(()=> User.findOne({email:email}))
        .then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject("this is not provided email");
            }else{
             bcrypt.compare(password,user.password).then((same)=>{ 
                if(!same){
                    mongoose.disconnect();
                    reject("your password is not correct");
                }else{
                    mongoose.disconnect();
                    resolve ({
                        id:user._id,
                        isAdmin:user.isAdmin
                    })
                }

            });
        }
            }).catch(err=>{
                mongoose.disconnect();
                console.log(err)
                reject(err)

         })
    })
}