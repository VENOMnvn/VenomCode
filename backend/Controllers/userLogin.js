const Token = require('../MongoDB/TokenSchema');
const User = require('../MongoDB/UserSchema');
const {sendToken} = require('./SendOtp');
const {jwtDecode} = require("jwt-decode")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const maxAge = 3 * 24 * 60 * 60;

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (email && password) {
            let user = await User.findOne({ email: email }).populate('posts');
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

        let {email,password} = req.body;
        console.log(req.body);
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        
        var tokenGen = function() {
            return rand() + rand(); // to make it longer
        };

        const token = tokenGen();
        console.log('Generated',token);
        sendToken(token,email);

        await Token.create({
            token:token,
            email:email,
            password:hashPassword
        },{timestamps:true});

        res.send({
            success:true
        });

      }catch(err){
        console.log(err);
      } 
}

const resetLogin = async (req,res)=>{
    const {token} = req.query;
    console.log(token);
    try{
        const resp = await Token.findOneAndUpdate({token},{isVerified:true});
        if(!resp){
            res.send("Invalid Token");
        }

        await User.findOneAndUpdate({email:resp.email},{password:resp.password});
        
        res.send({
            success:true,
            message:"Password Changes Successfully"
        });


    }catch(err){

    }
}

const googlesignin = async (req,res)=>{
    try {
        if(req.body){
        
            const dataFromGoogle = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+req.body.access_token);
            console.log(dataFromGoogle.data);
            if(dataFromGoogle.data){
                   
                    const existingUser = await User.findOne({email:dataFromGoogle.data.email}).select(' -password');
                    console.log(existingUser,"rr");
                    if(existingUser){

                        res.send({
                            success:true,
                            user:existingUser
                        });

                    }else{

                        function generatePassword(length) {
                            
                                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%",
                                retVal = "";
                            for (var i = 0, n = charset.length; i < length; ++i) {
                                retVal += charset.charAt(Math.floor(Math.random() * n));
                            }
                            return retVal;
                        }

                        const password = generatePassword(6);
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const username  = generatePassword(10);
                        const dob = new Date('2003-01-20');
                        const user = {
                            email:dataFromGoogle.data.email,
                            firstname:dataFromGoogle.data.given_name,
                            lastname:dataFromGoogle.data.family_name,
                            profilePicture:dataFromGoogle.data.picture,
                            password:hashPassword,
                            dob,
                            gender:"Not Set",
                            username,
                            googleUser:True
                        }
                        console.log(user);

                        let responseFromCreate = await User.create(user);
                        responseFromCreate.password="hidden";
                        console.log('new',responseFromCreate);
                        res.send({
                            success:true,
                            user:responseFromCreate
                        });
                    }
            }else{
                res.send({
                    msg:"Email Not valid"
                });
            }
            
        }else{
            res.send("Not reached google");
        }
        
    } catch (error) {
            console.log(error);
    }
}

module.exports = {userLogin,resetPassword,resetLogin,googlesignin};