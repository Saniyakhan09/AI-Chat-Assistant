const  {Server } = require("socket.io")
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const  aiService = require('../../Services/ai.service')
const messageModel = require("../../module/message.model")
const {createMemory,queryMemory} = require("../../Services/vector.service")
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



  io.on("connection", (socket)=>{
        socket.on("ai-message", async (messagePayload)=>{
        console.log(messagePayload)
      /* messagePayload = { chat:chatId,content:message text } */
            const [ message, vectors ] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: messagePayload.content,
                    role: "user"
                }),
                aiService.generateVector(messagePayload.content),
            ])

            await createMemory({
                vectors,
                messageId: message._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: messagePayload.content
                }
            })


            const [ memory, chatHistory ] = await Promise.all([

                queryMemory({
                    queryVector: vectors,
                    limit: 3,
                    metadata: {
                        user: socket.user._id
                    }
                }),

                messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1 }).limit(20).lean().then(messages => messages.reverse())
            ])

            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [ { text: item.content } ]
                }
            })

            const ltm = [
                {
                    role: "user",
                    parts: [ {
                        text: `

                        these are some previous messages from the chat, use them to generate a response

                        ${memory.map(item => item.metadata.text).join("\n")}
                        
                        ` } ]
                }
            ]







const response = await aiService.generateResponse(messagePayload.content);

        socket.emit('ai-response', {
         chat: chatId,
         title: userMessage,
        })
           const [ responseMessage, responseVectors ] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: response,
                    role: "model"
                }),
                aiService.generateVector(response)
            ])

            await createMemory({
                vectors: responseVectors,
                messageId: responseMessage._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: response
                }
            })
       })
     })
}

module.exports = initSocketServer;