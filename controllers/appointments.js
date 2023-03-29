const appointment = require('../models/Appointment')
const patient = require('../models/Patient')
const user = require('../models/Users')
const {sendConfirmation} = require('../controllers/sendOtp')


const requestAppointment =async(req,res)=>{
    try{
        const {doctorID,patientID,date,slot} = req.body
        const id = generateUserID()
        console.log(id)
        const _patient = await patient.findOne({patientID:patientID})
        const _doctor = await patient.findOne({doctorID:doctorID})
        const result = await appointment.create({
            appointmentID:id,
            doctorID:doctorID,
            patientName:_patient.name,
            doctorName:_doctor.name,
            patientID:patientID,
            date:date,
            slot:slot,
            appointmentStatus:"PENDING"
        })
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}

const confirmAppointment =async(req,res)=>{
    try{
        const {appointmentID} = req.body
        
        const n = await appointment.updateOne({ appointmentID:appointmentID }, { appointmentStatus: "UPCOMING" }, { upsert: true })
        const app = await appointment.findOne({appointmentID:appointmentID})
        const doc = await user.findOne({userID:app.doctorID})
        const _patient = await user.findOne({userID:app.patientID})

        req.patientName = app.patientName
        req.doctorName = app.doctorName
        req.patientEmail = _patient.email
        req.docEmail = doc.email
        req.time = app.date.concat(" at",app.slot)
        sendConfirmation(req,res)

        //res.status(200).json({message:"Confirmed"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}

const rejectAppointment =async(req,res)=>{
    try{
        const {appointmentID} = req.body
        
        const n = await appointment.deleteOne({ appointmentID:appointmentID })
        res.status(200).json({message:"Rejected"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
}


const patientUpcomingAppointment =async(req,res)=>{
    try{
        const {patientID} = req.body

        
        const result = await appointment.find({ patientID:patientID,appointmentStatus: "UPCOMING" })
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}
const patientPastAppointment =async(req,res)=>{
    try{
        const {patientID} = req.body
        
        const result = await appointment.find({ patientID:patientID,appointmentStatus: "COMPLETED"})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
}

const doctorUpcomingAppointment =async(req,res)=>{
    try{
        const {doctorID} = req.body
        
        const result = await appointment.find({ doctorID:doctorID,appointmentStatus: "UPCOMING"})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}

const doctorPendingAppointment =async(req,res)=>{
    try{
        const {doctorID} = req.body
        
        const result = await appointment.find({ doctorID:doctorID,appointmentStatus: "PENDING" })
        console.log(result)
        console.log("result")
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}
const doctorPastAppointment =async(req,res)=>{
    try{
        const {doctorID} = req.body
        
        const result = await appointment.find({ doctorID:doctorID,appointmentStatus: "COMPLETED"})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
}
const markAsCompleted =async(req,res)=>{
    try{
        const {appointmentID} = req.body
        
        const result = await appointment.updateOne({ appointmentID:appointmentID}, { appointmentStatus: "COMPLETED" }, { upsert: true })
        console.log(result)
        res.status(200).json({message:"Updated"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
}




function generateUserID() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports = {requestAppointment,confirmAppointment,markAsCompleted,
     doctorPastAppointment,doctorUpcomingAppointment, 
     patientPastAppointment, patientUpcomingAppointment, rejectAppointment,
      doctorPendingAppointment}