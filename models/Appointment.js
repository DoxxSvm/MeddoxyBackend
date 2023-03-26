const mongoose = require('mongoose')
const appointmentSchema = mongoose.Schema({
    appointmentID:{
        type:String,
        required:true
    },
    doctorID:{
        type:String,
        required:true
    },
    patientID:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    slot:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
        required:true
    },
    prescription:{
        type:String,
    }

},{timestamps:true})
module.exports = mongoose.model("Appointment",appointmentSchema)