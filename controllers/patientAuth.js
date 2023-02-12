const user = require('../models/Users')
const patient = require('../models/Patient')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "DOXXSVM"

const existing =  async (req,res) =>{
    const {mobile} =req.body
    try {
        const existingUser = await user.findOne({mobile:mobile})
        if(!existingUser){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({ user: existingUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message":"something went wrong"})
    }
}
const signin = async (req,res) =>{
    const {mobile,password} =req.body
    try {
        const existingUser = await user.findOne({mobile:mobile})
        if(!existingUser){
            return res.status(404).json({"message":"User not found"})
        }
        const matchPass = await bcrypt.compare(password,existingUser.password)
        if(!matchPass){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({ mobile: mobile}, SECRET_KEY)
        res.status(200).json({ user: existingUser, token: token })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"message":"something went wrong"})
    }
}

const signup= async (req, res) => {
    const {mobile,password,name,address,email} = req.body
    try {
    
        const hashedPass = await bcrypt.hash(password, 10)
        const id = generateUserID()
        console.log(id)
        const result = await user.create({
            mobile: mobile,
            password: hashedPass,
            userID:id
        })
        console.log(result)
        const result2=await patient.create({
            patientID:id,
            name:name,
            address:address,
            email:email
        })
        console.log(result2)

        const token = jwt.sign({ mobile: mobile}, SECRET_KEY)
        res.status(201).json({ message:"patient added successfully",user: result, token: token })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({"message":"something went wrong"})
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

module.exports = {existing, signin, signup}