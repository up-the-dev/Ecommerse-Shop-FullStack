const { required } = require('joi')
const Joi = require('joi')
const User = require('../models/user')
const CustomErrorHandler = require('../services/CustomErrorHandler')
const { editProfileSchema } = require('../validators')
const profileController = {
    getProfile: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -cartItems -refreshToken -__v ')
            if (!user) {
                return next(CustomErrorHandler.unauthorized('user not found'))
            }
            return res.render('shop/profile', {
                path: '/profile',
                pageTitle: 'profile',
                user
            })
        } catch (error) {
            return next(error)
        }

    },
    geteditProfile: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -cartItems -refreshToken -__v ')
            if (!user) {
                return next(CustomErrorHandler.unauthorized('user not found'))
            }
            return res.render('shop/edit-profile', {
                path: '/edit-profile',
                pageTitle: 'edit profile',
                user
            })
        } catch (error) {
            return next(error)
        }

    },
    editProfile: async (req, res, next) => {
        try {
            //validation

            const { error } = await editProfileSchema.validate(req.body)
            if (error) {
                req.flash('error', `${error.message}`)
                return res.redirect('edit-profile');
               

            }

            const userId = req.user._id
            const { firstName, lastName, phone, email, imgUrl, addressLine1, city, pincode, state, country } = req.body
            const result = await User.updateOne({ _id: userId }, {
                firstName, lastName, phone, email, imgUrl,
                address: { addressLine1, city, pincode, state, country }

            })
            
            return res.redirect('/profile')
        } catch (error) {
            return next(err)
        }

    }
}
module.exports = profileController