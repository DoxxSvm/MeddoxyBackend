const mongoose=require('mongoose')
const userSchema = mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    userType:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)