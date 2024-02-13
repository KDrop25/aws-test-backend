const transporter = require('../../config/nodemailer')
const {CurrentBackend} = require('../../config/currentOrigin')
const path = require('path');
const fs = require('fs')

const sendVerifyMail = async(username,useremail,user_id) => {
    try{
        const templateContent = fs.readFileSync(path.join(__dirname, '..','..','views','email files', 'verifyemail.html'), 'utf8');
        console.log(CurrentBackend)
        const verificationLink = `${CurrentBackend}/register/verify?id=${user_id}`
        console.log(verificationLink)
        const mailOptions = {
            from:process.env.AUTH_EMAIL,
            to:useremail,
            subject:"Halo Email Verification",
            html: templateContent.replace('{username}', username).replace('{verification_link}', verificationLink),

        };
        
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
                
            }
            else{
                console.log(info);
                console.log("VERIFY email has been sent");
            }
        })

    }catch(error){
        console.log(error.message)
    }
}


const sendOtpMail = async(username,useremail,otp) => {
    try{
        const templateContent = fs.readFileSync(path.join(__dirname, '..','..','views','email files', 'otpemail.html'), 'utf8');
        
        
        const mailOptions = {
            from:process.env.AUTH_EMAIL,
            to:useremail,
            subject:"Halo 5.0 Password Reset",
            html: templateContent.replace('{username}', username).replace('{otp}', otp),

        };
        
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
                
            }
            else{
                console.log(info);
                console.log("OTP email has been sent");
            }
        })

    }catch(error){
        console.log(error.message)
    }
}


module.exports = { sendVerifyMail ,sendOtpMail};