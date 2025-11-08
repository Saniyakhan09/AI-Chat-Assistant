const  {Server } = require("socket.io")
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const  aiService = require('../Services/ai.service')


function initSocketServer(httpServer){
   const io = new Server(httpServer, {})
     
    try{  io.use(async (socket,next)=>{
        const cookies= cookie.parse(socket.handshake.headers?.cookie || "")
        if(!cookies.token){
            next(new error("Authintication erroe: no token provided"))
        }
        const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET)
        socket.user = decoded;
        next();
     })
   
  }catch(err){
    next(new Error("Authinatication errr: invalid error"))
  } 


//
  io.on("connection", (socket)=>{


       socket.on("ai-message", async (messagePayload)=>{
        console.log(messagePayload)

if (!messagePayload.content) {
    console.log("❌ No content received:", messagePayload);
    socket.emit("ai-response", {
        error: "Message content is missing"
    });
    return;
}

const response = await aiService.generateResponse(messagePayload.content);

        socket.emit('ai-response', {
         chat: chatId,
    title: userMessage,

        })
       })
     })
}

module.exports = initSocketServer;