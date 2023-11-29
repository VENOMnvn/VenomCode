const Token = require('../MongoDB/TokenSchema');
const User = require('../MongoDB/UserSchema');
const {sendToken} = require('./SendOtp');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (email && password) {
            let user = await User.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (user.email === email && isMatch) {
                    // const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    // const proData = await ProffesionalModal.findById(user.professionDetails);
                    // res.redirect('/');
                    user.password = "hidden"
                    res.send({success:true,
                        user
                        });
                }
                else {
                    res.send({succcess:false,msg:"Incorrect Password"})
                }
            }
            else {
                res.send({succcess:false,msg:"You are not registered with us."});
            }
        } else {
            res.send({ "status": "failed", "message": "Please fill all the fields" });
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ "status": "failed", "message": `${err}` })
    }
}

const resetPassword = async (req,res)=>{
      try{

        const {email} = req.body;

        var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        
        var tokenGen = function() {
            return rand() + rand(); // to make it longer
        };

        const token = tokenGen();
        console.log('Generated',token);
        sendToken(token,email);

        const respond = await Token.create({
            token:token,
            email:email
        },{timestamps:true});

        res.send("OK");
      }catch(err){
        console.log(err);
      } 
}

const resetLogin = async (req,res)=>{
    const {token} = req.query;
    console.log(token);
    try{
        const resp = await Token.findOneAndUpdate({token},{isVerified:true});
        res.send({
            success:true
        })
    }catch(err){

    }
}


module.exports = {userLogin,resetPassword,resetLogin};