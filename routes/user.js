const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin,userLogin} =require('../controllers/user')
const {addToCart,getCart,incCart,decCart,deleCart,getCartCount} =require("../controllers/cart")

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)  
router.post("/login",userLogin)    
router.post("/addToCart",addToCart)
router.post("/getCart",getCart)
router.post("/getCartCount",getCartCount)
router.post("/incCart",incCart)
router.post("/decCart",decCart)
router.post("/deleCart",deleCart)




module.exports = router; 

