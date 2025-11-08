const mongoose = require('mongoose');
 
const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String
    },
    lastactivity:{
        type:Date,
        daefault:Date.now
    }
})

const chatModule = mongoose.model('chat',chatSchema);

module.exports = chatModule;