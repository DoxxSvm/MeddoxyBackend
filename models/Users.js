const mongoose=require('mongoose')
const userSchema = mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)