const mongoose = require("mongoose")
const connection = require("../utils/database")


const productSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ModelNumber: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    SubCategory: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Stock:{
        type: String,
        required: true
    },
    LandingCost:{
        type: String,
        required:true
    },
    Profit:{
        type: String,
        required:true
    },
    Description:{
        type: String,
        required:true
    },

}
)



const Product = connection.model('Product',productSchema);
module.exports = Product;