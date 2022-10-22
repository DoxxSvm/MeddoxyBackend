const employee = require('../models/employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "DOXXSVM"
const signin = async (req,res) =>{
    const {employeeID,password} =req.body
    try {
        const existingEmployee = await employee.findOne({employeeID:employeeID})
        if(!existingEmployee){
            return res.status(404).json({"message":"User not found"})
        }
        const matchPass = await bcrypt.compare(password,existingEmployee.password)
        if(!matchPass){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({ employeeID: existingEmployee.employeeID}, SECRET_KEY)
        res.status(200).json({ user: existingEmployee, token: token })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message":"something went wrong"})
    }
}

const signup= async (req, res) => {
    const {employeeID,password} = req.body
    try {
    
        const hashedPass = await bcrypt.hash(password, 10)
        console.log(hashedPass)
        const result = await employee.create({
            employeeID: employeeID,
            password: hashedPass,
        })
        console.log(result)

        const token = jwt.sign({ employeeID: result.employeeID}, SECRET_KEY)
        res.status(201).json({ user: result, token: token })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({"message":"something went wrong"})
    }
}
const getLatLong = (req,res) =>{
    
    const long = (Math.random() * (81 - 74) + 74).toFixed(6);
    const lat = (Math.random() * (27 - 18) + 18).toFixed(6);

    res.status(200).json({"latitute":lat,"longitute":long})
    
}

const getMobileNo = (req,res) =>{

    const totalNo = Math.floor(Math.random() * (7 - 4) + 4).toString()
    const numbers = []
    for(let i=0;i<totalNo;i++){
        const start = Math.floor(Math.random() * (10 - 6) + 6).toString()
        const end = Math.random().toString().slice(2,11)
        const number = start+end
        numbers.push(number.toString())
    }
    res.status(200).json({"mobileNumbers":numbers})


    

}
module.exports = {signin, signup, getLatLong, getMobileNo}