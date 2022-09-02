const CustomErrorHandler = require("../services/CustomErrorHandler")
const JwtService = require("../services/jwt")

const auth = async (req, res, next) => {
    let token
    try {
         token = req.header('Authorization').split(' ')[1]
    } catch (err) {
        return next(CustomErrorHandler.unauthorized('token not found'))
    }
    let user
    try {
        const { _id, role } = await JwtService.varify(token)
        user = {
            _id, role
        }
    } catch (error) {
        return next(error)
    }
    req.user = user
    next()
}
module.exports = auth