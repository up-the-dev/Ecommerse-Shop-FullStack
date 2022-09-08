const Joi = require('joi');
module.exports={
    productSchema:Joi.object({
        title:Joi.string().required(),
        imageUrl:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string()
      })
}
