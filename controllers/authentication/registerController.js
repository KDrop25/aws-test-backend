const User = require('../../models/User');
const path = require('path');
const fs = require('fs')
const bcrypt = require('bcrypt');
const transporter = require('../../config/nodemailer')
const { sendVerifyMail } = require('./sendmailController');
const { CurrentOrigin } = require('../../config/currentOrigin')


const VerifyEmail = async (req, res) => {

    try {
        const verified = await User.updateOne({ _id: req.query.id }, { $set: { verified: true } });
        const templateContent = fs.readFileSync(path.join(__dirname, '..', '..', 'views', 'email files', 'email-verified.html'), 'utf8');
        const updatedContent = templateContent.replace('{frontend_signin}', `${CurrentOrigin}/signin`)
        res.send(updatedContent)

    } catch (error) {
        console.log(error.message)
    }
}



const handleNewUser = async (req, res) => {
    const { user, pwd, email } = req.body;
    if (!user || !pwd || !email) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    const duplicateemail = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({ 'Conflict': `Username Already Exists` }); //Conflict 
    if (duplicateemail) return res.status(409).json({ 'Conflict': `Email Address Already Exists` });//Conflict 




    try {
        //encrypt the password

        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd
        });

        sendVerifyMail(user, email, result._id);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser, VerifyEmail };