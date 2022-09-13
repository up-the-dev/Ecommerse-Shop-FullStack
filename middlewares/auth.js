const CustomErrorHandler = require("../services/CustomErrorHandler")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const auth = async (req, res, next) => {
    console.log('from auth')
    let token = req.cookies.access_token
    if (token) {
        let user
        try {
            const { _id, role } = await jwt.verify(token, JWT_SECRET,async (err,decoder) => {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        await res.redirect('/auth/refresh')
                    } else {
                        return next(CustomErrorHandler.unauthorized(err.message))
                    }
                }
            })
            user = {
                _id, role
            }
        } catch (error) {
            return next(error)
        }
        req.user = user
        next()
    } else {
        console.log('token not found !')
        res.redirect('/auth/login')
    }
}
module.exports = auth