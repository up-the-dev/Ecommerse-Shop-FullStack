const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')
class JwtService{
    static sign(payload,secret=JWT_SECRET,expiry='60s'){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static varify(token,secret){
        return jwt.verify(token,secret)
    }
}
module.exports=JwtService