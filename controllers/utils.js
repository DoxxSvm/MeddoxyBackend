const doctor = require('../models/Doctor')
const patient = require('../models/Patient')

const docList = async(req,res)=>{
    const {specialization} = req.body
    console.log(specialization)
    const list = await doctor.find({})
    const list2 = await doctor.find({specialization:specialization})
    res.status(200).send(list2)
}
const docDetails=async(req,res)=>{
    const {doctorID} = req.body
    const doc = await doctor.findOne({doctorID:doctorID})
    res.status(200).send(doc)
}
const favDoctorsDetails = async(req,res) =>{
    const {patientID} = req.body
    console.log(patientID)
    const _patient = await patient.findOne({patientID:patientID})
    console.log(_patient)
    const favouriteDoctor= _patient.favouriteDoctor
    const list = await doctor.find({ doctorID: { $in: favouriteDoctor } })
    res.status(200).json(list)
}
const addFavDoctor = async(req,res) =>{
    const {doctorID,patientID} = req.body
    console.log(patientID)
    const patientData = await patient.find({ patientID:patientID })
    console.log(patientData)
    var list = patientData.favouriteDoctor
    if(!list) list = []
    list.push(doctorID)
    console.log(list)
    const n = await patient.updateOne({patientID:patientID},{favouriteDoctor:list},{upsert:true})
    res.status(200).json(n)
}
module.exports = {docList,docDetails,favDoctorsDetails,addFavDoctor}