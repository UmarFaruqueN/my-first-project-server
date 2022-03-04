const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin} =require('../controllers/user')

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)




module.exports = router; 

