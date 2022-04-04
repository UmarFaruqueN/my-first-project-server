const mongoose = require("mongoose");
const connection = require("../utils/database");

const offerSchema = new mongoose.Schema({
     type: {
          type: String,
          required: true,
     },

     offerAmount: {
          type: Number,
          required: true,
     },
     minimumPurchase: {
          type: Number,
          required: true,
     },
     expireAt: { type: Date, expires: 20 },
});

const Offer = connection.model("Offer", offerSchema);
module.exports = Offer;
