const  transporter  = require("../config/email.config")
const OTPModel = require("../models/otp")



const generateOTP = ()=>{
    return Math.floor(10000 + Math.random() * 90000)
}


const sendEmailVerificationOTP = async (user)=>{
    try{

        const otp = generateOTP()

        const expiresAt = new Date(Date.now() + 15*60*1000)

        await OTPModel.deleteMany({userId: user._id})

        await OTPModel.create({
            userId:user._id,
            otp,
           
        })


        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Email Verification OTP",
            html: `
        <h2>Email Verification</h2>
        <p>Hello ${user.name},</p>
        <p>Your OTP for email verification is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 15 minutes.</p>
        <p>If you did not request this, please ignore.</p>
      `,
        })
        return otp

    } catch(error){
        console.error("OTP Email Error",error)
        throw new Error("Invalid to send OTP email")
    }
}


module.exports = sendEmailVerificationOTP;