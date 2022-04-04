const Offer = require("../models/offers");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
     addOffer: async (req, res) => {
          const data = {
               type: req.body.type,
               offerAmount: req.body.offerAmount,
               minimumPurchase: req.body.minimumPurchase,
               expiresAt: Date.now(),
          };
          try {
               const newOffer = await Offer.create(data);
               if (newOffer) {
                    const allOffer = await Offer.find();
                    if (allOffer) {
                         return res.status(200).json({ message: " Offer Created Successfully", allOffer });
                    }
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     deleOffer: async (req, res) => {
          const { _id } = req.body;
          try {
               const newOffer = await Offer.deleteOne({ _id: ObjectId(_id) });
               if (newOffer) {
                    const allOffer = await Offer.find();
                    if (allOffer) {
                         return res.status(200).json({ message: " Offer Deleted Successfully", allOffer });
                    }
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
