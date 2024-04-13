const User = require("../MongoDB/UserSchema.js");
const ProfessionModel = require("../MongoDB/professionSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateOtp,sendByEmail} = require('./SendOtp.js');
const OTP = require('./../MongoDB/OTPschema.js');
const cloudinary = require("cloudinary");
const { getDataUri } = require("../utils/DataUri.js");
const { createToken } = require("../middleware/auth.js");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET_KEY,
});

const userRegisteration = async (req,res)=>{
  console.log(req.body);
  const {
    email
  }=req.body;

  try{
    const checkuser = await User.findOne({email:email});
    
    if(checkuser){
      console.log("CheckUser:",checkuser,'\n');
      res.send({
        success:false,
        msg:"Email Already Exists"
      })
      return;
    }

    const otp = await generateOtp();
    await sendByEmail(email,otp);
    await OTP.deleteMany({email});
    const otpResponse = await OTP.create({otp,email});
    console.log(otpResponse);

    res.send({
      success:true,
      msg:"OTP successfull"
    })

    return;

  }catch(err){
      res.send({
        success:false,
        error:err,
        msg:"Some Error Occured"
      })
  }
};


const userSignin = async (req,res)=>{
    console.log("=====",req.body);
    const {
      email,
      otp,
      username,
      password,
      firstname,
      lastname,
      dob,
      designation,
      skills,
      gender,
      city,
      organisation,
    } = req.body;

    try{ 

        const otpresponse = await OTP.findOne({email});
        console.log(otpresponse);
        if(!otpresponse){
          
          return;
        }

        if(otpresponse.otp == otp){

          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          
            let user = await User.create({
              email,
              username,
              password:hashPassword,
              firstname,
              lastname,
              dob,
              gender,
              designation,
              skills,
              city,
              organisation,
            });
            user.password = "Hidden";
            const token = createToken(user._id);
            res.cookie('tokenVenom',token);
            res.send({
              success:true,
              token,
              msg:user
            })
        }else{
            res.send({
              success:false,
              msg:"OTP invalid"
            });
        }
        
    }catch(err){
      console.log(err);
      res.send({
        success:false,
        msg:"some Network Error",
        err
      })
    }
}

// const userRegisteration = async (req, res) => {
//   console.log("Data Start Here -> ", req.body, "<- Data End Here");
//   const {
//     name,
//     number,
//     email,
//     password,
//     occupation,
//     dob,
//     IsServiceProvider,
//     location,
//     language,
//     Experience,
//     BarNumber,
//     Category,
//     Details,
//   } = req.body;

//   const user = await User.findOne({ email: email });
//   if (user) {
//     res.send({
//       status: "failed",
//       message: "Email already exists",
//       isDone: false,
//     });
//   } else {
//     if (name && number && email && password && location) {
//       try {
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         const doc = new User({
//           name: name.toLowerCase(),
//           number: number,
//           email: email,
//           password: hashPassword,
//           location: location.toLowerCase(),
//           profession: occupation.toLowerCase(),
//           dob,
//           IsServiceProvider: IsServiceProvider,
//           Details,
//           language,
//         });

//         const user = await doc.save();

//         const userProfession = new ProfessionModel({
//           userid: user._id,
//           Category: Category.toLowerCase(),
//           Experience,
//           BarNumber,
//           Occupation: occupation,
//           name,
//           Location: location.toLowerCase(),
//         });

//         const resByProffesion = await userProfession.save();
//         const resByUser = await User.findByIdAndUpdate(user._id, {
//           professionDetails: userProfession._id,
//         });

//         const UserData = await User.findById(user._id);
//         const ProfessionData = await ProfessionModel.findById(
//           resByProffesion._id
//         );

//         console.log(resByProffesion, ProfessionData, resByProffesion);


//         const token = jwt.sign(
//           { userID: user._id },
//           process.env.JWT_SECRET_KEY,
//           { expiresIn: "5d" }
//         );

//         res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

//         res.send({
//           message: "Ok",
//           UserData,
//           ProfessionData,
//           isDone: true,
//         });

//       } catch (error) {
//         console.log(error);
//         res.send({
//           status: "failed",
//           message: "Unable to Register",
//           isDone: false,
//         });
//       }
//     } else {
//       console.log(name, email, location, password, number);
//       res.send({
//         status: "failed",
//         message: "All fields ar required",
//         isDone: false,
//       });
//     }
//   }
// };


const getUserName = async (req,res)=>{
  try{
    const {user} = req.query;
    console.log(user);
    const isValid = await User.findOne({username:user});
    if(isValid){
      res.send({
        isUserUnique:false
      })
      return;
    }

    res.send({
      isUserUnique:true
    });
    
  }catch(err){
    console.log(err);
    res.send({
      isUserUnique:false,
      success:false,
      res:err
    })
  }


};
const addDetails = async (req, res) => {
  const { adharNo, panNo, licenseNo, barCouncilNo, officeAddress } = req.body;
  console.log("Aadhar No:", adharNo);
  console.log("Pan No:", panNo);
  console.log("License No:", licenseNo);
  console.log("Bar Council No:", barCouncilNo);
  console.log("Office Address:", officeAddress);
  res.send("OK");
};

const uploadDocs = async (req, res) => {
  // ADD details add

  // Document upload on cloudinary

  // console.log("ndifio",req.params.id)
  const userId = req?.params?.id
  try {
    // Upload files to Cloudinary

    const adharImageResult = req.files.adharImage[0];
    const panImageResult = req.files.panImage[0];
    const licenseImageResult = req.files.licenseImage[0];
    const educationalCertificateResult = req.files.educationalCertificate[0];

    const adharImageResultUri = getDataUri(adharImageResult);
    const panImageResultUri = getDataUri(panImageResult);
    const licenseImageResultUri = getDataUri(licenseImageResult);
    const educationalCertificateResultUri = getDataUri(
      educationalCertificateResult
    );

    const mycloudAdhar = await cloudinary.v2.uploader.upload(
      adharImageResultUri.content
    );
    // const mycloudPan = await cloudinary.v2.uploader.upload(
    //   panImageResultUri.content
    // );
    // const mycloudLicense = await cloudinary.v2.uploader.upload(
    //   licenseImageResultUri.content
    // );
    // const mycloudCertificate = await cloudinary.v2.uploader.upload(
    //   educationalCertificateResultUri.content
    // );

    console.log(mycloudAdhar.public_id)
    console.log(mycloudAdhar.secure_url)
    

    ProfessionModel.findById(userId).then((profession) => {
      console.log(profession);

      profession.adharImage= {
        public_id: mycloudAdhar?.public_id || "",
        url: mycloudAdhar?.secure_url || "",
      };
      // profession.panImage={
      //   public_id: mycloudPan?.public_id || "",
      // url: mycloudPan?.secure_url || "",
      // };
      // profession.licenseImage={
      //   public_id: mycloudLicense?.public_id || "",
      // url: mycloudLicense?.secure_url || "",
      // };
      // profession.certificateImage={
      //   public_id: mycloudCertificate?.public_id || "",
      // url: mycloudCertificate?.secure_url || "",
      // }

      profession.save().then((response) => 
         res.status(200).send("OK")
      )
      .catch((error) => {
        console.log(error)
      });
    })


  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Error uploading files" });
  }
};

const addExperience = (req, res) => {
  const submittedData = req.body;
  console.log("Received data on the server:", submittedData);
  res.json({ message: "Data received successfully on the server." });
};

const proffesionalData = (req, res) => {
  console.log(res.body);
  res.send("OK");
};



module.exports = {
  userRegisteration,
  proffesionalData,
  addDetails,
  uploadDocs,
  addExperience,
  userSignin,
  getUserName
};
