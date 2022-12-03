const express = require('express');
const user = require('../models/user-model');
const router = express.Router();

router.post('/login', (req, res) => {
  user.getUserByEmail(req, res);
});

router.post('/register', (req, res) => {
  user.registerUser(req, res);
});

module.exports = router;
