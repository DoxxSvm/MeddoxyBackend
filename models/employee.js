const mongoose=require('mongoose')
const employeeSchema = mongoose.Schema({
    employeeID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Employee",employeeSchema)