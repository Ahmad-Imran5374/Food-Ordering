const expressAsyncHandler=require('express-async-handler')
const dotenv=require('dotenv')
dotenv.config()
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass:process.env.SMTP_PASSWORD,
    },
  });

const sendEmail=expressAsyncHandler(async(req,res)=>{
    const {email,subject,message}=req.body
    console.log(email,subject,message)
    var mailOptions={
        from:process.env.SMTP_Mail,
        to:email,
        subject:subject,
        text:message
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log('Email sent suceesfully')
        }
    })
})


module.exports={sendEmail}