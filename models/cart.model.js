const serverCon = "mongodb+srv://islam:quran30114@cluster0-t69y4.mongodb.net/online-shop?retryWrites=true&w=majority";
const DB_url = "mongodb+srv://islam:quran30114@cluster0-t69y4.mongodb.net/online-shop?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    productId:String,
    userId:String,
    timeStamp:Number
})

const CartItem = mongoose.model("cart",cartSchema);

exports.addNewItem = data =>{
    return new Promise((resolve,reject)=>{
        mongoose
            .connect(DB_url,{ useNewUrlParser: true , useUnifiedTopology: true })
            .then(()=>{
                let item = new CartItem(data);
                return item.save();
            })
            .then(()=>{
                mongoose.disconnect();
                resolve();
            })
            .catch(err=>{
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getItemsByUser = userId=>{
    return new Promise((resolve,reject)=>{
        mongoose
            .connect(DB_url,{ useNewUrlParser: true , useUnifiedTopology: true })
            .then(()=>{
                return CartItem.find(
                    { userId:userId },
                    {},
                    { sort:{ timeStamp:1 } }
                )
            })
            .then(items=>{
                mongoose.disconnect()
                resolve(items)
            })
            .catch(err=>{
                mongoose.disconnect()
                reject(err)
            });
        });  
};
  
exports.editItem = (id,newData)=>{
    return new Promise((resolve,reject)=>{
        mongoose
            .connect(DB_url,{ useNewUrlParser: true , useUnifiedTopology: true })
            .then(()=> CartItem.updateOne({_id : id }, newData))
            .then(items=>{
                mongoose.disconnect();
                resolve(items);
            })
            .catch((err)=>{
                mongoose.disconnect();
                reject(err)
            });
    });
};

exports.deleteItem = id => {
    return new Promise((resolve,reject)=>{
        mongoose
            .connect(DB_url,{ useNewUrlParser: true , useUnifiedTopology: true })
            .then(()=> CartItem.findByIdAndDelete(id))
            .then(()=>{
                mongoose.disconnect()
                resolve()
            })
            .catch(err=>{
                mongoose.disconnect()
                reject(err)
            });
    });
};