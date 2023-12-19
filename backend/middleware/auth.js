const jwt = require('jsonwebtoken')

const createToken = (user)=>{
    return jwt.sign({user},process.env.JWT);
}

const auth = (req,res,next)=>{

    try{
        const head = req.headers
        console.log(head);
        console.log(head['authorization']);
        const token = head['authorization']?.split(" ")[1];
        console.log(token);
        jwt.verify(token,process.env.JWT,(err,data)=>{
            if(err){
                console.log("invalid token");
                res.send("invalid token");
                return;
            }
            next();
        });

    }catch(err){
        console.log(err);
    }
}

module.exports = {createToken,auth}