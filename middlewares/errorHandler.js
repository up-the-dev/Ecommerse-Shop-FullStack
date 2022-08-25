const {DEBUG_MODE}=require('../config')
const errorHandler = async (err,req, res, next) => {
    console.log(err)
    let status = 500
    let data = {
        msg: 'internal server error',
        ...(DEBUG_MODE==='true' && {err:err.message})
        }
        console.log(err)
        res.status(status).json(data)
}
module.exports = errorHandler