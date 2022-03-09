const mongoose = require("mongoose");
const connection = require("../utils/database");

const productSchema = new mongoose.Schema({
     ProductName: {
          type: String,
          required: true,
     },
     ModelNumber: {
          type: String,
          required: true,
     },
     Category: {
          type: String,
          required: true,
     },

     SubCategory: {
          type: String,
          required: true,
     },
     Type: {
          type: String,
          required: true,
     },
     Stock: {
          type: Number,
          required: true,
     },
     LandingCost: {
          type: Number,
          required: true,
     },
     SellingPrice: {
          type: Number,
          required: true,
     },
     Description: {
          type: String,
          required: true,
     },
     CategoryOffer: {
          type: Number,
          required: true,
     },
     SubCategoryOffer: {
          type: Number,
          required: true,
     },
     TypeOffer: {
          type: Number,
          required: true,
     },
     ProductOffer: {
          type: Number,
          required: true,
     },
     CouponOffer: {
          type: Number,
          required: true,
     },
     Customers: {
          type: Array,
        
     },
     Images: {
          type: Array,
     },
     rating: {
          type: Array,
     },
});

const Product = connection.model("Product", productSchema);
module.exports = Product;
