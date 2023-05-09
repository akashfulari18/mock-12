const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    cnfPassword:{type:String},
}) 

const UserModel = mongoose.model("user",userSchema)

module.exports=UserModel