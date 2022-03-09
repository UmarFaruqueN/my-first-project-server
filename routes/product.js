const express = require('express')
const router = express.Router();

const {addProduct,getProduct,deleteProduct, addImage} =require('../controllers/product')

//middleware


//api routes

router.post("/add",addProduct);
router.get("/get",getProduct);
router.post("/delete",deleteProduct);

router.post("/image/add",addImage);





module.exports = router; 
