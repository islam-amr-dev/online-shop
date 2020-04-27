const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://islam:quran30114@cluster0-t69y4.mongodb.net/online-shop?retryWrites=true&w=majority';

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String,
});

const product = mongoose.model('product', productSchema);

exports.getAllProducts = () =>  {

     return new Promise((resolve,reject)=>{
         mongoose.connect(DB_URL).then(()=>{
             return product.find({})
         }).then(products =>{
            mongoose.disconnect()
             resolve(products)
         }).catch(err => reject(err))
     })

   /* return new Promise(async(resolve, reject) => {
        try {
            await mongoose.connect(DB_URL,{useNewUrlParser: true , useUnifiedTopology: true });
  
            var products = await product.find({});

            mongoose.disconnect();
            resolve(products);
        } catch (err) {
            reject(err);
        }

    })*/
}   
        exports.getProductByCategory = (category) => {
            return new Promise((resolve, reject) => {
                mongoose.connect(DB_URL).then(() => {
                    return product.find({ category: category })
                }).then(products => {
                    mongoose.disconnect();
                    resolve(products)
                }).catch(err => {
                    reject(err);
                })
            })
        }

        exports.getProductById = (id) => {
            return new Promise((resolve, reject) => {
                mongoose.connect(DB_URL).then(() => {
                    return product.findById(id)
                }).then(products => {
                    mongoose.disconnect();
                    resolve(products);
                }).catch(err => { reject(err) })
            })
        }

        exports.addNewProduct = data => {
            return new Promise((resolve, reject) => {
                mongoose
                    .connect(DB_URL)
                    .then(() => {
                        let newProduct = new product(data);
                        return newProduct.save();
                    })
                    .then(products => {
                        mongoose.disconnect();
                        resolve(products);
                    })
                    .catch(err => {
                        mongoose.disconnect();
                        reject(err);
                    });
            });
        }; 