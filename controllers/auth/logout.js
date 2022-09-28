const User = require('../../models/user')
const logOutController = {
    async logout(req, res, next) {
        try {
            await User.updateOne({ _id: req.user._id }, { $unset: { refreshToken: 1 } })
            res.cookie('access_token', '')
            res.cookie('refresh_token', '')
        } catch (err) {
            return next(new Error('Something went wrong in the database'));
        }

    }
}
module.exports = logOutController;