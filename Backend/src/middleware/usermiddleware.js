const jwt = require('jsonwebtoken')


async function verify(req,res,next){
   try{
const token = await  req.cookies.token ;

if(!token){
    return res.status(400).json({
        message:"token not found"
    })
}
const decoded =  jwt.verify(token,process.env.JWT_SECRET)

req.user = decoded;
next();
}catch(err){
    return res.status(400).json({
        message:`err ${err}`
    })
}

}

module.exports = verify;