const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')
class JwtService{
    static sign(payload,secret=JWT_SECRET,expiry='10s'){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static varify(token,secret=JWT_SECRET){
        return jwt.verify(token,secret)
    }
}
module.exports=JwtService