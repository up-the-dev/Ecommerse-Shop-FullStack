const Joi = require("joi")
const User = require("../../models/user")
const bcrypt=require('bcrypt')
const CustomErrorHandler = require("../../services/CustomErrorHandler")

const logincontroller = {
    login: async () => {
        //request validation
        const loginSchema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{4,128}$')).required()
        })
        console.log(req.body)
        const {error} =loginSchema.validate(req.body)
        if(error){
            return next(error)
        }
        //checking if user exist
        try {
            const user=await User.findOne({email:req.body.email})
            if(!user){
                return next(CustomErrorHandler.unauthorized('user not exist.please register first !'))
            }
            await bcry
        } catch (error) {
            return next(error)
        }

    }
}