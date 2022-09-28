const CustomErrorHandler = require("../services/CustomErrorHandler")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const refreshController = require("../controllers/auth/refresh")

const auth = async (req, res, next) => {
   
    let token = req.cookies.access_token
    if (token) {
        let user
        try {
            const { _id, role } = await jwt.verify(token, JWT_SECRET)
            user = {
                _id, role
            }
            req.user = user
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                await refreshController.refresh(req, res, next)
            } else {
                return next(CustomErrorHandler.unauthorized(error.message))
            }
        }
        next()
    } else {
        console.log('token not found !')
        return res.redirect('/auth/login')
    }
}
module.exports = auth