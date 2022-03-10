const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     addToCart: async (req, res) => {
          console.log("started  cart controller");
          try {
               const product = await Product.findOne({ _id: ObjectId(req.body._id) });
               const user = await User.findOne({ _id: ObjectId(req.body.user) });
               if (product && user) {
                    const cartData = await Cart.create(req.body);
                    const updateProduct = await Product.findOneAndUpdate(
                         { _id: ObjectId(req.body._id) },
                         { $inc: { Stock: -1 } }
                    );
                    const allProduct = await Product.find();
                    const allCart = await Cart.find({user:req.body.user });
                    return res.status(200).json({ message: " Product Added to Cart", allProduct, allCart });
               }
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
