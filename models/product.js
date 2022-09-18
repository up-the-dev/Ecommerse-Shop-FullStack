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
  },
  admin:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
})

const Product=new mongoose.model('Product',productSchema)
module.exports=Product

