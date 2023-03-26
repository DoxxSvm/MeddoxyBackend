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
    const doc = await doctor.find({doctorID:doctorID})
    res.status(200).send(doc)
}
const favDoctorsDetails = async(req,res) =>{
    const {doctorIDs} = req.body
    const list = await doctor.find({ doctorID: { $in: doctorIDs } })
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