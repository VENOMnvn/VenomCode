const jwt = require('jsonwebtoken')

const createToken = (user)=>{
    return jwt.sign({user},process.env.JWT);
}

const auth = (req,res,next)=>{

    try{
        const head = req.headers
        const token = head['authorization']?.split(" ")[1];
        
        jwt.verify(token,process.env.JWT,(err,data)=>{
            if(err){
                console.log("invalid token");
                res.send("invalid token");
                return;
            }
            console.log("Token Verified");
            next();
        });

    }catch(err){
        console.log(err);
    }
}

module.exports = {createToken,auth}