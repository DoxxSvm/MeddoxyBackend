const express = require('express')
const { existing, signin ,signup,docSignup} = require('../controllers/patientAuth')
const {sendOtp, verifyOtp} = require('../controllers/sendOtp')
const {docList,docDetails,favDoctorsDetails,addFavDoctor} = require('../controllers/utils')
const patientRouter=express.Router()
const utilRouter = express.Router()

patientRouter.post('/signin',signin)
patientRouter.post('/signup',signup)
patientRouter.post('/docsignup',docSignup)
patientRouter.post('/existing',existing)
patientRouter.post('/sendOtp',sendOtp)
patientRouter.post('/verifyOtp',verifyOtp)

utilRouter.post('/doclist',docList)
utilRouter.post('/docdetails',docDetails)
utilRouter.post('/favdocdetails',favDoctorsDetails)
utilRouter.post('/addfavdoctor',addFavDoctor)





module.exports = {patientRouter,utilRouter}