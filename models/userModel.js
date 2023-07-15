
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');

//model - models are higher-order constructor  that take a schema and instance of a document  to set a default equivalent to record RDB
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter a username'],
    },
    email:{
        type:String,
        required:[true,'Please enter a email'],
    },
    password:{
        type:String,
        default:""
    },
    customerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    }
})

//hash password

userSchema.pre('save',async function(next){
    //pre middleware will be caled before any  user document is saved or changed 
    //pre middleware function needs to salt and hash password before they are saved to the database
    if(!this.isModified("password")){
        next();
    }
    //saltRound =10 -default hoata hai
    const salt=await bcrypt.genSalt(10);//genSalt means
    this.password=await bcrypt.hash(this.password,salt);
    next();
});



//match password function 
// compare() method hota hai - yah password string ko leta hai and campare krta  hai hashed password se in database 
// .....agr match hua to retun true 

userSchema.methods.matchPassword=async function(password)
{
    return await bcrypt.compare(password,this.password)
}



//SIGN TOKEN 
userSchema.methods.getSignToken=function(res){
 const accessToken=JWT.sign({id:this._id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIREIN});
 const refreshToken=JWT.sign({id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:process.env.JWT_REFRESH_EXPIREIN});
 res.cookie('refreshToken',`${refreshToken}`,{maxAge:86400*7000,httpOnly:true});
};




const User=mongoose.model('User',userSchema);

module.exports=User