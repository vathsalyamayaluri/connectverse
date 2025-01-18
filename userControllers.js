const users= require('../models/User');
const userotp=require("../models/userOtp");
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
service:"gmail",
auth:{
user:process.env.EMAIL,
pass:process.env.PASSWORD
}
})
exports.userRegister=async(req,res)=>{
const{fname,email,password,mobile, isRGUKTian,RGUKTianID}=req.body;
const image="art.jpeg";
if(!fname || !email || !password){
res.status(400).json({error:"PLease Enter All Fields"})
}
try{
const preUser=await users.findOne({email:email});
if(preUser){
res.status(400).json({error:"This user already exist"})
}
else{
const userRegister=new users({
fname,email,password,mobile,isRGUKTian,RGUKTianID,image
}).save();
//here password Hashing
res.status(200).json({message:"successful"});
}
}catch(error){
res.status(400).json({error:"Invalid Details",error})
}
}
//user send otp
exports.userOtpSend=async(req,res)=>{

const {email}=req.body;
if(!email){
res.status(400).json({error:"PLease enter your email"})
}
try{
const preUser=await users.findOne({email:email});
if(preUser){
const otp=Math.floor(100000+Math.random()*900000);
const existEmail=await userotp.findOne({email:email})
if(existEmail){
const updateData=await userotp.findByIdAndUpdate({_id:existEmail._id},{
otp:otp
},{new:true});
await updateData.save();
const mailOptions={
from:process.env.EMAIL,
to:email,
subject:"sending Email For Otp Validation",
text:`Otp:${otp}`
}
transporter.sendMail(mailOptions,(error,info)=>{
if(error){
console.log("error",error)
res.status(400).json({error:"Email NOt Send"})
}else{
console.log("Email SEnt",info.response);
res.status(200).json({message:"Email sent Successfully"})
}
})
}
else{
const saveOtpData=new userotp({
email,otp:otp
})
await saveOtpData.save();
const mailOptions={
from:process.env.EMAIL,
to:email,
subject:"sending Email For Otp Validation",
text:`Otp:${otp}`
}
transporter.sendMail(mailOptions,(error,info)=>{
if(error){
console.log("error",error)
res.status(400).json({error:"Email NOt Send"})
}else{
console.log("Email SEnt",info.response);
res.status(200).json({message:"Email sent Successfully"})
}
})
}
}else{
res.status(400).json({error:"This user not existed"})
}
}catch(error){
res.status(400).json({error:"Invalid Details",error})
}
}
exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ error: "Please enter your OTP and email" });
    }

    try {
        const otpVerification = await userotp.findOne({ email: email });

        if (!otpVerification) {
            return res.status(400).json({ error: "Invalid email or OTP" });
        }

        if (otpVerification.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const preUser = await users.findOne({ email: email });

        if (!preUser) {
            return res.status(400).json({ error: "User not found" });
        }

        // Generate token
        const token = await preUser.generateToken();
        res.status(200).json({ message: "login successful", userToken: token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", error: error.message });
    }
}
