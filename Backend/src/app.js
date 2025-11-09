const express = require('express')
const cookieparser = require('cookie-parser')
const authroute = require('../route/authroute')
const chatroute = require('../route/chatroute')


const app = express();

/* using middlewares */
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use(express.json());
app.use(cookieparser());
app.use('/auth',authroute)
app.use('/api',chatroute)



app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
module.exports = app;