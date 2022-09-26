const Joi = require('joi');
module.exports = {
  productSchema: Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string()
  }),
  editProfileSchema: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).allow(''),
    email: Joi.string().email(),
    imgUrl: Joi.string().allow(''),
    addressLine1: Joi.string().allow(''),
    city: Joi.string().allow(''),
    pincode: Joi.number().allow(''),
    state: Joi.string().allow(''),
    country: Joi.string().allow(''),
    submit: Joi.allow()
  }),
  registerSchema: Joi.object({
    firstName: Joi.string().required().messages({'not_filled':'FirstName is required'}),
    lastName: Joi.string().required().messages({'not_filled':'Last is required'}),
    email: Joi.string().email().required().messages({'invalid email':'email is not valid'}),
    password: Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{4,128}$')).required().messages({'invalid password':'please enter valid password'}),
    repeat_password: Joi.ref('password')
  }),
loginSchema : Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-z0-9#@]{4,128}$')).required().messages({'invalid password':'please enter valid password'})
  })

}
