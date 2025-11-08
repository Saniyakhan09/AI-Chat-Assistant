const express = require('express');
const authroute = express.Router();
const authcontroller = require('../controller/authcontroller')

authroute.post('/register',authcontroller.register)
authroute.post('/login',authcontroller.login)

module.exports = authroute;