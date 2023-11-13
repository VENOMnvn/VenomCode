const transporter = require('../config/emailConfig.js');

const SendOtp = async (req, res) => {
    const { email } = req.body
    if (email) {
        //send Email
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "OTP from backend",
            html: `<h1>Sample OTP: 123456 </h1>`
        });
        res.send({ "status": "success", "message": "otp sent on mail" })
    }
    else {
        res.send({ "status": "fail", "message": "enter email" })
    }
}

module.exports = SendOtp