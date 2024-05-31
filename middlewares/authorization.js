 function authorization(role){
    return (req,res,next)=>{
        let result=role.includes(req.user.role)
        if(result==true){
            next();
        }
        else{
            res.send("Not Authorized")
        }
    }
}
module.exports={authorization}