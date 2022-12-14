const User = require("../../models/user")
const bcrypt = require('bcrypt')
const JwtService = require('../../services/jwt')
const { REFRESH_SECRET } = require('../../config')
const { loginSchema } = require("../../validators")

const logincontroller = {
    login: async (req, res, next) => {
        //request validation
        req.flash('register', 'false')
        const { error } = loginSchema.validate(req.body)
        if (error) {
            req.flash('error', `wrong username or password`)
            return res.redirect('login');

        }
        //checking if user exist
        let access_token
        let refresh_token
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                req.flash('error', 'user not exist . please register first !')
                return res.redirect('login');

            }
            //password varification
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                req.flash('error', 'Wrong Password !')
                return res.redirect('login');


            }
            access_token = await JwtService.sign({ _id: user._id, role: user.role })
            refresh_token = await JwtService.sign({ _id: user._id, role: user.role }, REFRESH_SECRET, '7d')
            //saving refresh_token in db inside user model
            await User.updateOne({ _id: user._id }, { $set: { "refreshToken.token": refresh_token } })
        } catch (error) {
            return next(error)
        }
        res.cookie('access_token', access_token, {
            httpOnly: true
        })
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true
        })
        return res.redirect('/home')

    },
    getLogin: (req, res, next) => {
        return res.render('shop/login', {
            pageTitle: 'login',
            path: '/auth/login',
            register: false
        })
    }
}
module.exports = logincontroller