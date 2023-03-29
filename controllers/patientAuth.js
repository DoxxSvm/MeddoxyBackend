const user = require('../models/Users')
const patient = require('../models/Patient')
const doctor = require('../models/Doctor')
const {sendOtp} = require('../controllers/sendOtp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "DOXXSVM"

const existing =  async (req,res) =>{
    const {email} =req.body
    try {
        const existingUser = await user.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({"message":"User not found"})
        }
        await sendOtp(req,res)
        
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
 const docSignup=async()=>{
    const {email,name,address,days,fees,speciality,description,experience} = req.body
    try {
    
        // const hashedPass = await bcrypt.hash(password, 10)
        
        const result = await user.create({
            userID:id,
            userType:"DOCTOR",
            email:email
        })
        console.log(result)
        const result2=await doctor.create({
            doctorID:id,
            name:name,
            address:address,
            daysAvailable:days,
            specialization:speciality,
            fees:fees,
            description:description,
            experience:experience,
            consultations:consulations(),
            rating:doxx()
        })
        console.log(result2)
        sendOtp(req,res)

    

        // const token = jwt.sign({ mobile: mobile}, SECRET_KEY)
        //res.status(201).json({ message:"patient added successfully",user: result})
    }
    catch (error) {
        console.log(error.message)
        //res.status(500).json({"message":"something went wrong"})
    }
 }

const signup= async (req, res) => {
    const {email,name,address} = req.body
    try {
    
        // const hashedPass = await bcrypt.hash(password, 10)
        const id = generateUserID()
        console.log(id)
        const result = await user.create({
            userID:id,
            userType:"PATIENT",
            email:email
        })
        console.log(result)
        const result2=await patient.create({
            patientID:id,
            name:name,
            address:address,
        })
        console.log(result2)
        sendOtp(req,res)

        // const token = jwt.sign({ mobile: mobile}, SECRET_KEY)
        //res.status(201).json({ message:"patient added successfully",user: result})
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

function doxx() {
    charset = ["3.5","4.1","4.9","4.8","4.6","3.9","4.2"]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function name() {
    charset = ["Shivam Gupta","Chirag Rastogi","Laxita Sodhani","Shivangi Prasad",
    "Prashant Kumar","Rishi Raj","Anand Kumar", "Anupam Singh", "Ranveer Kapoor","Ravi Ranjan Das",
"Sanjay Singh", "Munesh Kumar", "Michael Clark","Parth singla",
 "OP Tandon", "Vats Garg","Shahid Raza", "Manish Kumar", "Sanjeev Gupta","Vikash Singh","Sahil Garg","Aaryendra Chhabra", "Akhil Sagwal","Rohit Modi","Prasoon Singh"]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}
function address() {
    charset = ["Apollo Hospital","ASG Care","AIIMS","Life Care","Lal pathlabs","GMCH","PMCH"]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function days() {
    charset = [["MON","TUE","WED"], ["TUE,FRI"]]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function speciality() {
    charset = ["neurology","dermatology","psychiatry","ayurveda","cardiology","dental","diet","endocrinology","ent","gastro","general surgery","homeopathy",
        "nephrology","oncology","nephrology","ophthalmologist","pediatrics","physiotherapy","rheumatology"]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function description() {
    charset = ["Im an experienced and compassionate doctor dedicated to providing excellent medical care to my patients. I possess a deep understanding of the human body and strive to help my patients achieve optimal health and wellness"
,"I'm an experienced and compassionate doctor with a passion for helping others. I'm dedicated to providing my patients with the highest quality medical care and improving their overall well-being.",
"compassionate and knowledgeable medical professional dedicated to improving the health and well-being of their patients through evidence-based practices and ongoing education."]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function fees() {
    charset = [500,300,400,600,1000,900,700]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function experience() {
    charset = [3,4,5,6,7,8,9,10,11]
    var n = charset.length
    return charset[Math.floor(Math.random() * n)]
    
}

function consulations() {
    
    return Math.floor(Math.random() * 10000)
    
}
//docSignup()
module.exports = {existing, signin, signup,docSignup}