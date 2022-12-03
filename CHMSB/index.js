const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const passport = require('passport');
const config = require('./config/config');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/users-controller');
const appointmentController = require('./controllers/appointments-controller');
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.options('*', cors());
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// require('./config/passport-config')(passport);

app.use('/auth', authController);
app.use('/user', userController);
app.use('/appointment', appointmentController);

app.listen(config.PORT, () => {
  console.log(`Server Running On Port: ${config.PORT}`)
})
