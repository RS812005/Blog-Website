const jwt=require("jsonwebtoken")
const SECRET_KEY="rishabh@$@"
async function tokenAuth(req,res,next){
    const token=req.cookies.token
    if(!token){
        res.send("No token")
    }
    if(token){
    const decode=jwt.verify(token,SECRET_KEY)
    req.user=decode
    next();
    }
}
module.exports={
    tokenAuth
}