const express = require('express')
const router = express.Router();

const {addProduct,getProduct,deleteProduct, addImage} =require('../controllers/product');


//middleware
const upload = require("../utils/multer")

//api routes

router.post("/add",addProduct);
router.get("/get",getProduct);
router.post("/delete",deleteProduct);

router.post("/image/add",upload.array("img"),addImage);





module.exports = router; 
