const User = require("../MongoDB/UserSchema.js");
const ProfessionModel = require("../MongoDB/professionSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary");
const { getDataUri } = require("../utils/DataUri.js");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET_KEY,
});

const maxAge = 3 * 24 * 60 * 60; // 3 days

const userRegisteration = async (req, res) => {
  console.log("Data Start Here -> ", req.body, "<- Data End Here");

  const {
    name,
    number,
    email,
    password,
    occupation,
    dob,
    IsServiceProvider,
    location,
    language,
    Experience,
    BarNumber,
    Category,
    Details,
  } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    res.send({
      status: "failed",
      message: "Email already exists",
      isDone: false,
    });
  } else {
    if (name && number && email && password && location) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new User({
          name: name.toLowerCase(),
          number: number,
          email: email,
          password: hashPassword,
          location: location.toLowerCase(),
          profession: occupation.toLowerCase(),
          dob,
          IsServiceProvider: IsServiceProvider,
          Details,
          language,
        });

        const user = await doc.save();

        const userProfession = new ProfessionModel({
          userid: user._id,
          Category: Category.toLowerCase(),
          Experience,
          BarNumber,
          Occupation: occupation,
          name,
          Location: location.toLowerCase(),
        });

        const resByProffesion = await userProfession.save();
        const resByUser = await User.findByIdAndUpdate(user._id, {
          professionDetails: userProfession._id,
        });

        const UserData = await User.findById(user._id);
        const ProfessionData = await ProfessionModel.findById(
          resByProffesion._id
        );

        console.log(resByProffesion, ProfessionData, resByProffesion);

        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.send({
          message: "Ok",
          UserData,
          ProfessionData,
          isDone: true,
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Unable to Register",
          isDone: false,
        });
      }
    } else {
      console.log(name, email, location, password, number);
      res.send({
        status: "failed",
        message: "All fields ar required",
        isDone: false,
      });
    }
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

const profileComplete = async (req, res) => {
  console.log(req.body);

  console.log("RUn");

  const {
    adharNo,
    panNo,
    licenseNo,
    barCouncilNo,
    officeAddress,
    user_id,
    specilization,
    experiences,
  } = req.body;

  const result = await ProfessionModel.findByIdAndUpdate(user_id, {
    adharNo,
    panNo,
    licenseNo,
    barCouncilNo,
    officeAddress,
    specilization,
    Experience: experiences,
  });

  console.log(result);
  res.send("OK");
};

module.exports = {
  userRegisteration,
  proffesionalData,
  profileComplete,
  addDetails,
  uploadDocs,
  addExperience,
};
