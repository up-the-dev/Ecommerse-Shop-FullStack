const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectID=Schema.Types.ObjectId
const cartProductSchema=new Schema({
    productId:{
        type:ObjectID,
        required:true
    }
})
const CartProduct=mongoose.model('CartProduct',cartProductSchema)
module.exports=CartProduct