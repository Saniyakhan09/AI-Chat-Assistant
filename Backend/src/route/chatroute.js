const express = require('express')
const chatroute = express.Router();
const chatcontroller = require('../controller/chatcontroller')
const verify = require('../middleware/usermiddleware')

chatroute.post('/chat',verify,chatcontroller)

module.exports = chatroute;