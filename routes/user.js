const express = require('express')
const router = express.Router();

const {userSignup,mobileLogin,otpLogin,userLogin} =require('../controllers/user')
const {addToCart,incCart,decCart,deleCart,getCartCount} =require("../controllers/cart")
const {addWishlist,getWishlist,deleWishlist} = require("../controllers/wishlist")

//middleware


//api routes
router.post("/userSignup",userSignup);
router.post("/mobile",mobileLogin)
router.post("/otp",otpLogin)  
router.post("/login",userLogin)    
router.post("/addToCart",addToCart)
router.post("/getCartCount",getCartCount)
router.post("/incCart",incCart)
router.post("/decCart",decCart)
router.post("/deleCart",deleCart)
router.post("/addWishlist",addWishlist)
router.post("/getWishlist",getWishlist)
router.post("/deleWishlist",deleWishlist)




module.exports = router; 

