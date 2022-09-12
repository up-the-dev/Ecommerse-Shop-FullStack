const JwtService = require("../services/jwt")

const auth = async (req, res, next) => {
    let token = req.cookies.token
    if (token) {
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
    } else {
        res.redirect('/auth/login')
    }
}
module.exports = auth