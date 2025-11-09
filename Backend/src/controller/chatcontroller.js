const chatModule = require("../module/chatmodule");

async function chatcontroller(req,res){
  try{
const {title} = req.body;
   const user = req.user; //decoded
   if(!user){
    return res.status(400).json({
        message:"user token not found"
    })
   }

   const chat = await chatModule.create({title,user:user.id || user._id});
   return res.status(200).json({
    message:"chat created",
     chat,
     
   })
  } 
  catch(err){
    return res.status(400).json({
        message: `err here ${err}`
    })
  }
   

}
module.exports = chatcontroller;