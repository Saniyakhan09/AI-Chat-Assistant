const mongoose = require('mongoose')

async function connecttodb(){
   try{
   await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to db")
    })
   }catch(err){
    console.log(err)
   }
}

module.exports = connecttodb;