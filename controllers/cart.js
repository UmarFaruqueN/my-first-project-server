const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
     getCart: async (req, res) => {
          console.log("started");
          try {
               let cartData = await Cart.aggregate([
                    { $match: { user: { $eq: req.body.user } } },
                    {
                         $lookup: {
                              from: "products",
                              localField: "products.productId",
                              foreignField: "_id",
                              as: "productDetail",
                         },
                    }
                        
               ]);

               console.log("here");
               if (cartData) {
                    for(let i = 0; cartData[0].products.length>i;i++){
                         for(let j = 0; cartData[0].products.length>j;j++){
                              console.log(cartData[0].productDetail[i]._id.toString())
                              console.log(cartData[0].products[j].productId.toString())
                              if(cartData[0].productDetail[i]._id.toString()===cartData[0].products[j].productId.toString())
                         { console.log("its fucking true");
                              cartData[0].productDetail[i].counts=cartData[0].products[j].count }
                         }
                    }
                    return res.status(200).json({ message: "Cart Updated SuccessFull", cartData });
               }

               return res.status(500).json({ message: "No cart found" });
          } catch (error) {   
               console.log(error);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     addToCart: async (req, res) => {
          console.log("started  cart controller");
          console.log(req.body);
          try {
               const cart = await Cart.findOne({ user: ObjectId(ObjectId(req.body.user)) });
               if (cart) {
                    const product = await Cart.findOne({
                         user: ObjectId(req.body.user),
                         products: { $elemMatch: { productId: ObjectId(req.body._id) } },
                    });
                    if (product) {
                         const updateCount = await Cart.findOneAndUpdate(
                              {
                                   user: ObjectId(req.body.user),
                                   products: { $elemMatch: { productId: ObjectId(req.body._id) } },
                              },
                              { $inc: { "products.$.count": req.body.count } }
                         );
                         const cartData = await Cart.findOne({ user: ObjectId(req.body.user) });
                         return res.status(200).json({ message: " Cart Updated SuccessFull", cartData });
                    }
                    const addProduct = await Cart.findOneAndUpdate(
                         { user: ObjectId(req.body.user) },
                         { $push: { products: { productId: ObjectId(req.body._id), count: req.body.count } } }
                    );
                    if (addProduct) {
                         const cartData = await Cart.findOne({ user: ObjectId(req.body.user) });
                         return res.status(200).json({ message: " Product Added Cart  SuccessFull", cartData });
                    }
               }

               const newCart = await Cart.create({
                    user: ObjectId(req.body.user),
                    products: [
                         {
                              productId: ObjectId(req.body._id),
                              count: req.body.count,
                         },
                    ],
               });

               const cartData = await Cart.findOne({ user: ObjectId(req.body.user) });

               return res.status(200).json({ message: "  New Product Added Cart  SuccessFull", cartData });
          } catch (error) {
               console.log("ADDAYI BUT ENTHAROO KOYAPPAM");
               console.log(error);
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
