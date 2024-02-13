const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:'465',
    secure:true,
    
    auth:{
        user:"mirage.cgcj@gmail.com",
        pass:'pdwz ppmi iapo dxqd',
    }
})

module.exports = transporter;