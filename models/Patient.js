const mongoose=require('mongoose')
const patientSchema = mongoose.Schema({
    patientID:{
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
    favouriteDoctor:[String],
    upcomingAppointments:[String],
    pastAppointments:[String]
    
},{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)