const express = require('express')
const { existing, signin ,signup} = require('../controllers/patientAuth')
const patientRouter=express.Router()

patientRouter.post('/signin',signin)
patientRouter.post('/signup',signup)
patientRouter.get('/existing',existing)

module.exports = patientRouter