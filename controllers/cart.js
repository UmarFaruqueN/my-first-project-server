const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     addToCart: async (req, res) => {
          console.log("started  cart controller");
          const productId = req.body._id;
          try {
               const user = await User.findOne({ _id: ObjectId(req.body.user) });
               const product = await Product.findOne({ _id: ObjectId(req.body._id) });
               if (user && product) {
                    const cartUpdateUser = await User.findOneAndUpdate(
                         { _id: ObjectId(req.body.user) },
                         {
                              $push: {
                                   cart: req.body,
                              },
                         }
                    );

                    console.log(cartUpdateUser);

                    return res.status(200).json({ message: " Product Added to Cart", cartUpdateUser });
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
