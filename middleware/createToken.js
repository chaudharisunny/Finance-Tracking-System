const JWT=require('jsonwebtoken');
require('dotenv').config()

const secret=process.env.JWT_SECRET

function createToken(user){
 const  payload={
        username:user.username,
        email:user.email
    }
    return JWT.sign(payload,secret,{expiresIn:'8h'})

}

function verifyToken(token){
    try {
        return JWT.verify(token,secret)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={createToken,verifyToken}