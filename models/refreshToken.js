const { string } = require('joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const refreshTokenSchema=new Schema({
    token:{
        type:String,
        required:true
    }
})
exports.RefreshToken=new mongoose.model('RefreshToken',refreshTokenSchema)
