const express = require('express')
const router = express.Router();

const {addProduct,getProduct,deleteProduct} =require('../controllers/product')

//middleware


//api routes

router.post("/add",addProduct);
router.get("/get",getProduct);
router.post("/delete",deleteProduct);
router.get("/get",getProduct);





module.exports = router; 
