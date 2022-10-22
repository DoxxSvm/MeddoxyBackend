const express = require('express')
const { signin ,signup, getLatLong, getMobileNo } = require('../controllers/employeeControllers')
const employeeRouter=express.Router()

employeeRouter.post('/signin',signin)
employeeRouter.post('/signup',signup)
employeeRouter.get('/getlatlong',getLatLong)
employeeRouter.get('/getMobileNo',getMobileNo)


module.exports = employeeRouter