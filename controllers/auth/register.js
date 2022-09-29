const User = require('../../models/user')
const bcrypt = require('bcrypt')
const JwtService = require('../../services/jwt')
const { REFRESH_SECRET } = require('../../config')
const { registerSchema } = require('../../validators')
const register = {
    registration: async (req, res, next) => {
        //request validation
        req.flash('register', 'true')
        const { error } = registerSchema.validate(req.body)
        if (error) {
            // return next(error)
            req.flash('error', `${error.message}`)
            return res.redirect('login');

        } else {
            let access_token
            let refresh_token
            try {
                //checking if user already registered
                const exist = await User.findOne({ email: req.body.email })
                if (exist) {
                    req.flash('error', 'user already exist !')
                    return res.redirect('login');

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
                //issue jwt access token and refresh token
                access_token = JwtService.sign({ _id: result._id, role: result.role })
                refresh_token = JwtService.sign({ _id: result._id, role: user.role }, REFRESH_SECRET, '1y')
                //save refresh token in db
                await User.updateOne({ _id: result._id }, { "refreshToken.token": refresh_token })
            } catch (err) {
                return next(err)
            }
            res.cookie('access_token', access_token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            })
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true
            })
            return res.redirect('/home')
        }

    }
}
module.exports = register
