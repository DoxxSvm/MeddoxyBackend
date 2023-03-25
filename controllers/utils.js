const doctor = require('../models/Doctor')

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
module.exports = {docList,docDetails}