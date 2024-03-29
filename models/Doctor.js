const mongoose=require('mongoose')
const doctorSchema = mongoose.Schema({
    doctorID:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    daysAvailable:{
        type:[String],
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    rating:String,
    experience:Number,
    consultations:Number,
    image:String,

    
},{timestamps:true})

module.exports = mongoose.model("Doctor",doctorSchema)