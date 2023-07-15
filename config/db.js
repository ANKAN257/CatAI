const mongoose=require('mongoose');
const colors=require('colors');

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected ${mongoose.connection.host}`.bgWhite.green);
        
    } catch (error) {
         console.log(`database not connected ${error}`.bgRed.white);
    }
}

module.exports=connectDB;