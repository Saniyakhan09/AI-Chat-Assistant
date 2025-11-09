const { timeStamp } = require('console');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required: true,
        }
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }

   
})

const usermodel = mongoose.model("User",userSchema);

module.exports = usermodel;