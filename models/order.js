const mongoose = require("mongoose");
const connection = require("../utils/database");

const orderSchema = new mongoose.Schema({
     userId: {
          type: String,
          required: true,
     },
     name: {
          type: Array,
          required: true,
     },
     phone: {
          type: Number,
          required: true,
     },
     address: {
          type: Object,
          required: true,
     },

     products: {
          type: Array,
          required: true,
     },
     subtotal: {
          type: Number,
          required: true,
     },
     shipping: {
        
          type: Number,
          required: true,
     },
     discount: {
          type: Number,
          required: true,
     },
     total: {
          type: Number,
          required: true,
     },
     paymentStatus: {
          type: String,
          required: true,
     },
     deliveryStatus: {
          type: String,
          required: true,
     },
});

const Order = connection.model("Order", orderSchema);
module.exports = Order;
