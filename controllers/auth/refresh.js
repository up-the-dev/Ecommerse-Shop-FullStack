const Joi = require('joi')
const { RefreshToken } = require('../../models/refreshToken')
const CustomErrorHandler = require('../../services/CustomErrorHandler')
const JwtService = require('../../services/jwt')
const { REFRESH_SECRET } = require('../../config')
const User = require('../../models/user')
const refreshController = {
    refresh: async (req, res, next) => {
        //request validation
        const tokenSchema = Joi.object({
            token: String
        })
        const { error } = tokenSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        //does refresh token exist
        try {
            const exist = await RefreshToken.findOne({ token: req.body.token })
            if (!exist) {
                return next(CustomErrorHandler.unauthorized('token not found'))
            }
        } catch (err) {
            return next(err)
        }
        //token varification
        let access_token
        let refresh_token
        try {
            const { _id } = await JwtService.varify(req.body.token, REFRESH_SECRET)
            //does user exist
            const user = await User.findOne({ _id: _id })
            if (!user) {
                return next(CustomErrorHandler.unauthorized('user not found'))
            }
            //generating new tokens
            access_token = await JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET)
        } catch (err) {
            return next(err)
        }
        res.json({ access_token, refresh_token })

    }
}