const express=require('express');
const { registerController, loginController, logoutController } = require('../controller/authController');


//object route
const router =express.Router();

//routes
//REGISTER
router.post('/register',registerController);
//LOGIN ROUTES
router.post('/login',loginController);
//LOGOUT ROUTES
router.post('/logout',logoutController);



module.exports=router