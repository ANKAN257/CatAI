const express=require('express');
const morgan =require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const colors=require('colors');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

const errorHander = require('./middleware/errorMiddleware');
//routes file importing 
const authRoutes=require('./routes/authRoutes');


//dotenv
dotenv.config()

//mongoDB connection file importing 
connectDB();

//rest object
const app=express();

//middleWares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(errorHander);

const PORT=process.env.PORT ||8080

//API routes
app.use('/api/v1/auth',authRoutes);
app.use('api/v1/openai',require('./routes/openAIRoutes'))



//listen server
app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.DEV_MODE} on ${PORT} `.bgYellow.white);
})