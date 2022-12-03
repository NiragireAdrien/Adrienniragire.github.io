const express = require('express');
const appointment = require('../models/appointment-model');
const router = express.Router();

router.post('/schedule-appointment', (req, res) => {
  appointment.scheduleAppointment(req, res);
});

router.delete('/delete-appointment/:id', (req, res) => {
  appointment.deleteAppointment(req, res);
});

router.put('/update-appointment-status/:id', (req, res) => {
  appointment.updateAppointmentStatus(req, res);
});

router.get('/get-appointments-by-user-id/:id', (req, res) => {
  appointment.getAppointmentsByUserId(req, res);
});

router.get('/get-appointments', (req, res) => {
  appointment.getAppointments(req, res);
});


module.exports = router;
