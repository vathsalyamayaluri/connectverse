const mongoose=require('mongoose')
const Project=new mongoose.Schema({
 name:String,
 email:String,
 subject:String,
 description:String
})
const UserModel=mongoose.model("contacts",Project)
module.exports=UserModel; 