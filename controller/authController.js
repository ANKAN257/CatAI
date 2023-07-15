const userModel=require('../models/userModel');
const errorResponse = require('../utils/errorResponse');


//JWT TOKEN  
exports.sendToken=(user,statusCode,res)=>{
    const token=user.getSignedToken(res);
    res.status(statusCode).json({
        success:true,
        token ,
    });
};

//REGISTER
exports.registerController=async()=>{
    try {
        const {username,email,password}=req.body
        //exiting user
        const existingEmail=await userModel.findOne({email})
        if(existingEmail){
            return next(new errorResponse('Email is already register ', 500))
        }
      const user=await userModel.create({username,email,password})
      sendToken(user,201,res)


    } catch (error) {
        console.log(error);
        next(error)
    }
}

//LOGIN
exports.loginController=async()=>{
   
    try {
        const {email,password}=req.body
        //validation
        if(!email||!password){
            return next(new errorResponse("Please Provide email or password "));
        }
      const user =await userModel.findOne({email});
      if(!user){
        return next(new errorResponse("Invalid Credential",401))
      }
      const isMatch=await userModel.matchPassword(password)
      if(!isMatch){
        next(new errorResponse("Invalid Credential",401))

      }
      //res
      this.sendToken(user,200,res);

        
    } catch (error) {
        console.log(error);
        next(error)
    }

}

//LOGOT
exports.logoutController=async()=>{
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
}
