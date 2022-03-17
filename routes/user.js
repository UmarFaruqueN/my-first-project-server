const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin} =require('../controllers/user')
const {addToCart,getCart,incCart,decCart} =require("../controllers/cart")

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)    
router.post("/addToCart",addToCart)
router.post("/getCart",getCart)
// router.post("/incCart",incCart)
// router.post("/decCart",decCart)




module.exports = router; 

