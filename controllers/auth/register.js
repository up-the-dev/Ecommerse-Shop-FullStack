const Joi = require('joi')
const User = require('../../models/user')
const CustomErrorHandler = require('../../services/CustomErrorHandler')
const bcrypt = require('bcrypt')
const JwtService = require('../../services/jwt')
const { REFRESH_SECRET } = require('../../config')
const { RefreshToken } = require('../../models/refreshToken')
const register = {
    registration: async (req, res, next) => {
        //request validation
        const registerSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{4,128}$')).required(),
            repeat_password: Joi.ref('password')
        })
        const { error } = registerSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        let access_token
        let refresh_token
        try {
            //checking if user already registered
            const exist = await User.findOne({ email: req.body.email })
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('user already exist'))
            }
            //storing data into db
            //hashing password
            const password = await bcrypt.hash(req.body.password, 10)
            const { firstName, lastName, email } = req.body
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            const result = await user.save()
            console.log(result)
            //issue jwt access token and refresh token
            access_token = JwtService.sign({ _id: result._id, role: result.role })
            refresh_token = JwtService.sign({ _id: result._id, role: user.role }, REFRESH_SECRET, '1y')
            //save refresh token in db
            const refreshtoken = new RefreshToken({
                token: refresh_token
            })
            await refreshtoken.save()
        } catch (err) {
            return next(err)
        }
        res.json({ access_token, refresh_token })
    }
}
module.exports = register
