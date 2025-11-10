const usermodel = require('../module/authmodule');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function register(req,res){
   try{
    const {fullname:{firstname,lastname},email,password} = req.body

    const isexist = await usermodel.findOne({email});

    if(isexist){
        return res.status(400).json({
            message:"user exist login"
        })
    };

    const hash =await bcrypt.hash(password,10);

    const user = await usermodel.create({fullname:{firstname,lastname},email,password:hash});
    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET);

    res.cookie('token',token)

    return res.status(200).json({
        message:"user created succesfully",
        user,
        token
    })

   }catch(err){
    return res.status(400).json({
        message:`err ${err}`
    })
   }
}


async function login(req,res) {
  try{
    const {fullname:{firstname,lastname},email,password} = req.body;
    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }
    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
    res.cookie('token',token)
    return res.status(200).json({
        message:"user logged in succesfully"
    })
  }catch(error){
    return res.status(400).json({
        message:`err${error}`
    })
  }
}

module.exports = {register,login}