const Joi = require("joi")
const User = require("../../models/user")
const bcrypt = require('bcrypt')
const JwtService = require('../../services/jwt')
const {RefreshToken}=require('../../models/refreshToken')
const { REFRESH_SECRET } = require('../../config')
const CustomErrorHandler = require("../../services/CustomErrorHandler")

const logincontroller = {
    login: async (req,res,next) => {
        //request validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{4,128}$')).required()
        })
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        //checking if user exist
        let access_token
        let refresh_token
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return next(CustomErrorHandler.unauthorized('user not exist.please register first !'))
            }
            //password varification
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return next(CustomErrorHandler.unauthorized('Wrong Password !'))
            }
            access_token = await JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET, '7d')
            const refreshtoken =new RefreshToken({
                token:refresh_token
            })
            await refreshtoken.save()
        } catch (error) {
            return next(error)
        }
        res.cookie('access_token',access_token,{
            httpOnly:true
        })
        res.cookie('refresh_token',refresh_token,{
            httpOnly:true
        })
        res.redirect('/')

    },
    getLogin:(req,res,next)=>{
        res.render('shop/login',{
            pageTitle:'login',
            path:'/auth/login'
        })
    }
}
module.exports=logincontroller