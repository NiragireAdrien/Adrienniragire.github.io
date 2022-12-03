const express = require('express');
const user = require('../models/user-model');
const router = express.Router();

router.delete('/delete-user/:id', (req, res) => {
  user.deleteUser(req, res);
});

router.get('/get-users', (req, res) => {
  user.getUsers(req, res);
});

module.exports = router;
