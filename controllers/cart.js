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
                    },
               ]);

               console.log("here");
               if (cartData) {
                    for (let i = 0; cartData[0].products.length > i; i++) {
                         for (let j = 0; cartData[0].products.length > j; j++) {
                              console.log(cartData[0].productDetail[i]._id.toString());
                              console.log(cartData[0].products[j].productId.toString());
                              if (
                                   cartData[0].productDetail[i]._id.toString() ===
                                   cartData[0].products[j].productId.toString()
                              ) {
                                   console.log("its fucking true");
                                   cartData[0].productDetail[i].counts = cartData[0].products[j].count;
                                   cartData[0].productDetail[i].id = cartData[0]._id;
                                   console.log(cartData[0].productDetail[i].id + "updated");
                              }
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

     incCart: async (req, res) => {
          console.log("incart");
          console.log(req.body);

          try {
               const updateCart = await Cart.findOneAndUpdate(
                    {
                         _id: ObjectId(req.body.id),
                         products: { $elemMatch: { productId: ObjectId(req.body._id) } },
                    },
                    { $inc: { "products.$.count": 1 } }
               );

               let cartData = await Cart.aggregate([
                    { $match: { _id: { $eq: ObjectId(req.body.id) } } },
                    {
                         $lookup: {
                              from: "products",
                              localField: "products.productId",
                              foreignField: "_id",
                              as: "productDetail",
                         },
                    },
               ]);

               console.log(cartData);
               console.log("here");
               if (cartData) {
                    for (let i = 0; cartData[0].products.length > i; i++) {
                         for (let j = 0; cartData[0].products.length > j; j++) {
                              console.log(cartData[0].productDetail[i]._id.toString());
                              console.log(cartData[0].products[j].productId.toString());
                              if (
                                   cartData[0].productDetail[i]._id.toString() ===
                                   cartData[0].products[j].productId.toString()
                              ) {
                                   console.log("its fucking true");
                                   cartData[0].productDetail[i].counts = cartData[0].products[j].count;
                                   cartData[0].productDetail[i].id = cartData[0]._id;
                              }
                         }
                    }
                    return res.status(200).json({ message: "Cart Updated SuccessFull", cartData });
               }
               console.log(updateCart + "djnjfwn updated");
          } catch (error) {
               console.log(error);
          }
     },

     decCart: async (req, res) => {
          console.log("fecccart");
          console.log(req.body);

          try {
               const updateCart = await Cart.findOneAndUpdate(
                    {
                         _id: ObjectId(req.body.id),
                         products: { $elemMatch: { productId: ObjectId(req.body._id) } },
                    },
                    { $inc: { "products.$.count": -1 } }
               );

               let cartData = await Cart.aggregate([
                    { $match: { _id: { $eq: ObjectId(req.body.id) } } },
                    {
                         $lookup: {
                              from: "products",
                              localField: "products.productId",
                              foreignField: "_id",
                              as: "productDetail",
                         },
                    },
               ]);

               console.log(cartData);

               console.log("decart hetehere");
               if (cartData) {
                    for (let i = 0; cartData[0].products.length > i; i++) {
                         for (let j = 0; cartData[0].products.length > j; j++) {
                              console.log(cartData[0].productDetail[i]._id.toString());
                              console.log(cartData[0].products[j].productId.toString());
                              if (
                                   cartData[0].productDetail[i]._id.toString() ===
                                   cartData[0].products[j].productId.toString()
                              ) {
                                   console.log("its fucking true");
                              }
                              cartData[0].productDetail[i].counts = cartData[0].products[j].count;
                              cartData[0].productDetail[i].id = cartData[0]._id;

                              console.log(cartData[0].productDetail[i].id + "updated");
                         }
                    }

                    return res.status(200).json({ message: " Product Added Cart  SuccessFull", cartData });
               }

               console.log(updateCart);
          } catch (error) {
               console.log(error);
          }
     },

     deleCart: async (req, res) => {
          try {
               const product = await Cart.findOneAndUpdate(
                    {
                         _id: ObjectId(req.body.id),
                    },{
                         $pull:{products:{productId:ObjectId(req.body._id)}}
                    }
                  
               );


               let cartData = await Cart.aggregate([
                    { $match: { _id: { $eq: ObjectId(req.body.id) } } },
                    {
                         $lookup: {
                              from: "products",
                              localField: "products.productId",
                              foreignField: "_id",
                              as: "productDetail",
                         },
                    },
               ]);

               console.log("here");
               if (cartData) {
                    for (let i = 0; cartData[0].products.length > i; i++) {
                         for (let j = 0; cartData[0].products.length > j; j++) {
                              console.log(cartData[0].productDetail[i]._id.toString());
                              console.log(cartData[0].products[j].productId.toString());
                              if (
                                   cartData[0].productDetail[i]._id.toString() ===
                                   cartData[0].products[j].productId.toString()
                              ) {
                                   console.log("its fucking true");
                                   cartData[0].productDetail[i].counts = cartData[0].products[j].count;
                                   cartData[0].productDetail[i].id = cartData[0]._id;
                                   console.log(cartData[0].productDetail[i].id + "updated");
                              }
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
     getCartCount: async(req, res)=>{
          try {
               let cartData = await Cart.aggregate([
                    { $match: { user: { $eq: req.body.user } } } ,{
                         
                    }])
               
          } catch (error) {
               
          }
     }
};
