const express = require('express')

const {requestAppointment,confirmAppointment,markAsCompleted,
    doctorPastAppointment,doctorUpcomingAppointment, 
    patientPastAppointment, patientUpcomingAppointment, rejectAppointment,
     doctorPendingAppointment} = require('../controllers/appointments')

const appointmentRouter = express.Router()

appointmentRouter.post('/requestappointment',requestAppointment)
appointmentRouter.post('/confirmappointment',confirmAppointment)
appointmentRouter.post('/markascompleted',markAsCompleted)
appointmentRouter.post('/doctorpastappointment',doctorPastAppointment)
appointmentRouter.post('/doctorupcomingappointment',doctorUpcomingAppointment)
appointmentRouter.post('/patientpastappointment',patientPastAppointment)
appointmentRouter.post('/patientupcomingappointment',patientUpcomingAppointment)
appointmentRouter.post('/rejectappointment',rejectAppointment)
appointmentRouter.post('/doctorpendingappointment',doctorPendingAppointment)

module.exports = appointmentRouter