const Joi = require('joi')
const { DEBUG_MODE } = require('../config')
const CustomErrorHandler=require('../services/CustomErrorHandler')
const errorHandler = async (err, req, res, next) => {
    let status = 500
    let data = {
        msg: 'internal server error',
        ...(DEBUG_MODE === 'true' && { err: err.message })
    }

    if(err instanceof Joi.ValidationError){
        status=422,
        data={
            msg:err.message
        }
    }
    if(err instanceof CustomErrorHandler){
        status=err.status,
        data={
            msg:err.msg
        }
    }
    console.log(err)
    res.status(status).json(data)
}
module.exports = errorHandler