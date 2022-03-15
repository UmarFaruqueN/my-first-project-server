const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     addToCart: async (req, res) => {
          console.log("started  cart controller");
          console.log(req.body);
          try {
               const cart = await Cart.findOne({ user: req.body.user });
               if (cart) {
                    const product = await Cart.findOne({
                         user: req.body.user,
                         products: { $elemMatch: { productId: req.body._id } },
                    });
                    if (product) {
                         const updateCount = await Cart.findOneAndUpdate(
                              { user: req.body.user, products: { $elemMatch: { productId: req.body._id } } },
                              { $inc: { "products.count": req.body.count } }
                         );
                         const cartData = await Cart.findOne({ user: req.body.user });
                         return res.status(200).json({ message: " Cart Updated SuccessFull", cartData });
                    }
                    const addProduct = await Cart.findOneAndUpdate(
                         { user: req.body.user },
                         { $push: { productId: req.body._id, count: req.body.count } }
                    );
                    if (addProduct) {
                         const cartData = await Cart.findOne({ user: req.body.user });
                         return res.status(200).json({ message: " Product Added Cart  SuccessFull", cartData });
                    }
               }

               const newCart = await Cart.create({
                    user: req.body.user,
                    products: [
                         {
                              productId: req.body._id,
                              count: req.body.count,
                         },
                    ],
               });

               const cartData = await Cart.findOne({ user: req.body.user });

               return res.status(200).json({ message: "  New Product Added Cart  SuccessFull", cartData });
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
