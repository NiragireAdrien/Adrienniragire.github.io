const db=require('../config/database');

module.exports.scheduleAppointment = (req, res) => {
  db.query('SELECT * FROM appointments WHERE appointmentDate = ?', [req.body.appointmentDate], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while scheduling appointment.'});
      return;
    }

    if (response && response.length > 0) {
      res.status(500).json({success: false, message: 'The time you have selected is scheduled already, please choose another time.'});
      return;
    }

    if (!error && response.length === 0) {
      const appointment = {
        ...req.body,
        createdAt: new Date()
      };

      db.query(`INSERT INTO appointments SET ?`, appointment,function (error, response) {
        if (error) {
          res.status(500).json({success: false, message: 'Error occurred while scheduling appointment.'});
          return;
        }

        if (response) {
          res.status(200).json({success: true, message: 'Thank you for contacting us, your appointment is successfully received.'});
        }
      });
    }
  });
}

module.exports.deleteAppointment = (req, res) => {
  db.query('DELETE FROM appointments WHERE id = ?', [req.params.id], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while deleting appointment.'});
      return;
    }

    if (response) {
      res.status(200).json({success: true, message: 'appointment deleted successfully.'});
    }

  });
}

module.exports.updateAppointmentStatus = (req, res) => {
  db.query('SELECT * FROM appointments WHERE id = ?', [req.params.id], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while updating appointment status.'});
      return;
    }

    if (response && response.length === 0) {
      res.status(500).json({success: false, message: 'No appointment with this id exists.'});
      return;
    }

    if (response && response.length > 0) {
      db.query('UPDATE appointments SET status = ? WHERE id = ?', [req.body.status, req.params.id], (error, response) => {
        if (error) {
          res.status(500).json({success: false, message: 'Error occurred while updating appointment status.'});
          return;
        }

        if (response) {
          res.status(200).json({success: false, message: 'Appointment status updated successfully.'});
        }
      });
    }
  });
}

module.exports.getAppointmentsByUserId = (req, res) => {
  db.query('SELECT * FROM appointments WHERE user = ?', [req.params.id], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while retrieving appointments list.'});
      return;
    }

    if (response) {
      res.status(200).json({success: true, appointments: response});
    }
  });
}

module.exports.getAppointments = (req, res) => {
  db.query('SELECT * FROM appointments WHERE 1', (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while retrieving appointments list.'});
      return;
    }

    if (response) {
      res.status(200).json({success: true, appointments: response});
    }
  });
}
