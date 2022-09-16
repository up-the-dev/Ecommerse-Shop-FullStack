const CustomErrorHandler = require('../../services/CustomErrorHandler')
const JwtService = require('../../services/jwt')
const { REFRESH_SECRET } = require('../../config')
const User = require('../../models/user')
const refreshController = {
    refresh: async (req, res, next) => {

        //does refresh token exist
        const token = req.cookies.refresh_token
        try {
            const exist = await User.findOne({ "refreshToken.token": token })
            if (!exist) {
                return next(CustomErrorHandler.unauthorized('token not found'))
            }
        } catch (err) {
            return next(err)
        }

        let access_token
        let refresh_token
        let userObj
        try {
            //refresh token varification
            const { _id, role } = await JwtService.varify(token, REFRESH_SECRET)
            userObj = {
                _id, role
            }
        } catch (err) {
            return next(CustomErrorHandler.unauthorized('Invalid Refresh Token.please log in again.'))

        }
        try {
            //deleting refreshToken(one time use)
            await User.updateOne({ _id: userObj._id }, { $unset: { "refreshToken.token": 1 } })
            //does user exist
            const user = await User.findOne({ _id: userObj._id })
            if (!user) {
                return next(CustomErrorHandler.unauthorized('user not found'))
            }
            //generating new tokens
            access_token = await JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET, '7d')
            //saving refreshtoken

            await User.updateOne({ _id: user._id }, { $set: { "refreshToken.token": refresh_token } })
        } catch (err) {
            return next(err)
        }
        req.user = userObj
        res.cookie('access_token', access_token, {
            httpOnly: true
        })
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true
        })
    }
}
module.exports = refreshController