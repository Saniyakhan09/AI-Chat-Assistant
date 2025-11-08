const express = require('express')
const cookieparser = require('cookie-parser')
const authroute = require('../route/authroute')
const chatroute = require('../route/chatroute')


const app = express();
app.use(express.json());
app.use(cookieparser());
app.use('/auth',authroute)
app.use('/api',chatroute)

module.exports = app;