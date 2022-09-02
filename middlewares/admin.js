const CustomErrorHandler = require("../services/CustomErrorHandler")

const admin=async(req,res,next)=>{
    const role=req.user.role
    console.log(role)
    if(role!=='admin'){
        return next(CustomErrorHandler.unauthorized('restricted for admin !'))
    }
    next()
}
module.exports=admin