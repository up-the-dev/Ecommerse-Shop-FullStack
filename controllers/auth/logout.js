const Joi = require("joi");
const { RefreshToken } = require("../../models/refreshToken");

const logOutController = {
    logOut: async (req, res, next) => {
        await RefreshToken.findOneAndRemove({ token: req.cookies.refresh_token })
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        res.redirect('/auth/login')
    }
}
module.exports = logOutController;