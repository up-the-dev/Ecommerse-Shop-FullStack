const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  price:{
    type:Number,
    required:true
  }
})

const Product=mongoose.model('Product',productSchema)
module.exports=Product

/*
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};


class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
*/
