const app = require('../Backend/src/app')
require('dotenv').config();
const connecttodb = require('../Backend/db/db')


const initSocketServer = require('./socket/socket.server')
const httpServer = require("http").createServer(app);




connecttodb()

initSocketServer(httpServer);

httpServer.listen(3000,()=>{
    console.log('server is running')
});