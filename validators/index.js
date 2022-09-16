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
    phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    email: Joi.string().email(),
    imgUrl: Joi.string(),
    addressLine1: Joi.string(),
    city: Joi.string(),
    pincode: Joi.number(),
    state: Joi.string(),
    country: Joi.string()
  })

}
