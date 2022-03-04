const express = require('express')
const router = express.Router();

const {addProduct,getProduct} =require('../controllers/product')

//middleware


//api routes

router.post("/add",addProduct);
router.get("/get",getProduct);





module.exports = router; 
