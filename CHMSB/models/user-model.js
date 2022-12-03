const db=require('../config/database');
const config=require('../config/config');

module.exports.registerUser = (req, res) => {
  db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while registering user.'});
      return;
    }

    if (response && response.length > 0) {
      res.status(500).json({success: false, message: 'Email already exists.'});
      return;
    }

    if (!error && response.length === 0) {
      db.query(`INSERT INTO users SET ?`, req.body,function (error, response) {
        if (error) {
          res.status(500).json({success: false, message: 'Error occurred while registering user.'});
          return;
        }

        if (response) {
          res.status(200).json({success: true, message: 'User registered successfully.'});
        }
      });
    }
  });
}

module.exports.deleteUser = (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while deleting user.'});
      return;
    }

    if (response) {
      res.status(200).json({success: true, message: 'user deleted successfully.'});
    }

  });
}

module.exports.getUserByEmail = (req, res) => {
  db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while logging in.'});
      return;
    }

    if (response && response.length === 0) {
      res.status(500).json({success: false, message: 'User does not exists.'});
      return;
    }

    if (response && response.length > 0) {
      const user = response[0];

      if (user.password !== req.body.password) {
        res.status(500).json({success: false, message: 'Wrong Password.'});
        return;
      }

      if (user.email === config.adminEmail) {
        res.status(200).json({
          success: true,
          message: 'Admin logged in successfully.',
          isAdmin: true,
          user: {
            id: user.id,
            name: user.firstName,
            email: user.email,
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Logged in successfully.',
        isAdmin: false,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }
      });
    }
  });
}

module.exports.getUsers = (req, res) => {
  db.query('SELECT * FROM users WHERE 1', (error, response) => {
    if (error) {
      res.status(500).json({success: false, message: 'Error occurred while retrieving users list.'});
      return;
    }

    if (response) {
      const users = response.filter(user => user.email !== config.adminEmail);

      res.status(200).json({success: true, users: users});
    }
  });
}
