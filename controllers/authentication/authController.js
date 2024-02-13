const User = require ('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendVerifyMail ,sendOtpMail} = require('./sendmailController')

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email) return res.status(400).json({ 'message': 'email is required.' });
    if (!pwd) return res.status(400).json({ 'message': 'password cannot be blank.' });
    console.log("gg1")
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.status(400).json({'message':'User Does not Exist'}) //Unauthorized 
    console.log("gg2")
    
    const verified = foundUser.verified
    
    if (!verified){
        sendVerifyMail(foundUser.username,email,foundUser._id);
        return res.status(400).json({'message':'Please Verify Email Before Logging In - Verification Link Has been Sent to your Email ID'})
    }
    console.log("gg3")
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        console.log("gg4")
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        console.log("gg5")
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        console.log("gg6")
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });//secure: true, sameSite: 'None'
        
        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

let generatedOtp = null;
const sendotp = async (req, res) => {
    if (!req?.params?.email) return res.status(400).json({"message":"Email Id required"});
    const email = req.params.email
    const foundUser = await User.findOne({ email: email }).exec();
    console.log("hemlossssss")
    if (!foundUser) return res.status(401).json({'message':'User Does not exist'}) //Unauthorized 
    console.log("hemlosssssiuahdihadhawihdwauds")
    
    
    const verified = foundUser.verified
    if (!verified){
        sendVerifyMail(foundUser.username,email,foundUser._id);
        return res.status(400).json({'message':'Please Verify Email Before Logging In - Verification Link Has been Sent to your Email ID'})
    }
    
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    console.log(`this is the otp:${generatedOtp}`)
    
    sendOtpMail(foundUser.username,email,generatedOtp)
    res.sendStatus(200);

}

const verifyotp = async (req, res) => {
    if (!req?.params?.otp) return res.status(400).json({"message":"OTP is required"});
    const userotp = req.params.otp
    
    console.log(userotp)
    if (parseInt(userotp) === generatedOtp) {
        res.sendStatus(200);
        
    } else {
        // Handle incorrect OTP case
        res.status(400).json({"message":"Invalid OTP"});
    }
}


const changepwd = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required.' });
    if (!pwd) return res.status(400).json({ 'message': 'Password cannot be blank.' });
    

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.status(204).json({ 'message': `User ID ${req.params.email} not found` });
    
    
    
    
    try {
        const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
        foundUser.password = hashedPwd;
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    
    const result = await foundUser.save();
}


module.exports = { handleLogin ,sendotp,verifyotp,changepwd};