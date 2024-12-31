const nodemailer = require('nodemailer');
const { profileComplete } = require('./userRegisteration');
// method for generating otp and sending it
// through email or phone number

    async function generateOtp() {
        //   const otp=`${Math.floor(100000+Math.random() * 99999)}`;
        const otp = `${Math.floor(Math.random() * (999999 - 100000)) + 100000}`;
        console.log(otp, "Generate");
        return otp;
    }
    //sending by email using node mailer
    async function sendByEmail(email, otp) {
        console.log("Email", email,otp);

        var transporter = nodemailer.createTransport({
            // service: 'godaddy',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            }
        });
        
        var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Your OTP for Signin `,
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                <style>
                    body{
                        font-family: "Poppins",'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color:white;
                    }
                    .outer{
                        background-color: teal;
                        color: white;
                        max-width: 500px;
                        margin: auto;
                        border-radius: 8px;
                        padding: 40px;
                    }
                    .outer > *{
                        width: max-content;
                    }
                    p{
                        font-size: 24px;
                    }
                    .otp{
                        font-size: 32px;
                        font-weight: 700;
                        padding: 8px 12px;
                        margin: 6px ;
                        border: 1px solid lightgray;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    }
                    *{
                        color:white;
                    }
                </style>
            </head>
            <body>
                    <div class="outer">
                        <p>Welcome</p>
                        <span>We Delight to see you</span>
                        <br>
                        <span>Your OTP for VenomCode is </span>
                        <div class="otp">${otp}</div>
                        <span>Do not Share your OTP</span>
                        <br>
                        <span>Regards : Coding Squad</span>
                    </div>    
            </body>
            </html>`
        };
        
        try {
            const info = await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
            console.log(error.message, "While send email");
        }
    }


  


     
        

        
const sendToken = async (token,email)=>{
    try{

        console.log("Sending token to "+email);
        var transporter = nodemailer.createTransport({
            // service: 'godaddy',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Reset Password for Venom Code`,
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                <style>
                    body{
                        font-family: "Poppins",'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color:white;
                    }
                    .outer{
                        background-color: teal;
                        color: white;
                        max-width: 500px;
                        margin: auto;
                        border-radius: 8px;
                        padding: 40px;
                    }
                    .outer > *{
                        width: max-content;
                    }
                    p{
                        font-size: 24px;
                    }
                    .otp{
                        font-size: 32px;
                        font-weight: 700;
                        padding: 8px 12px;
                        margin: 6px ;
                        border: 1px solid lightgray;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    }
                    *{
                        color:white;
                    }
                </style>
            </head>
            <body>
                    <div class="outer">
                        <p>Welcome</p>
                        <span>We Delight to see you</span>
                        <br>
                        <span>Your Token for VenomCode reset password is </span>
                        <span> http://${process.env.DOMAIN}/resetlogin/?token=${token}</span>
                        <br>
                        <span>regards : Naveen Chaudahary</span>
                    </div>

            </body>
            </html>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Token Send");
        return info;

    }catch(err){
        console.log(err);
    }
}





module.exports = {sendToken,sendByEmail,generateOtp};