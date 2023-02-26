const express = require('express')
const { existing, signin ,signup} = require('../controllers/patientAuth')
const {sendOtp, verifyOtp} = require('../controllers/sendOtp')
const patientRouter=express.Router()

patientRouter.post('/signin',signin)
patientRouter.post('/signup',signup)
patientRouter.post('/existing',existing)
patientRouter.post('/sendOtp',sendOtp)
patientRouter.post('/verifyOtp',verifyOtp)

module.exports = patientRouter