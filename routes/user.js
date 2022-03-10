const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin} =require('../controllers/user')
const {addToCart} =require("../controllers/cart")

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)
router.post("/addToCart",addToCart)




module.exports = router; 

