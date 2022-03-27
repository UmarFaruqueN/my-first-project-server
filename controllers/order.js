const { ObjectId } = require("mongodb");
const Order = require("../models/order");
const User = require("../models/user");

module.exports = {
     addOrder: async (req, res) => {
          console.log("started Add order");
          const data = req.body;
          const details = {
               userId: data.address._id,
               name: data.address.name,
               phone: data.address.phone,
               address: data.address.address[0],

               products: data.products,
               subtotal: data.subtotal,
               shipping: data.shipping,
               discount: data.discount,
               total: data.total,
               paymentStatus: "pending",
               deliveryStatus: "pending",
          };

          try {
               const newOrder = await Order.create(details);
               if (newOrder) {
                    const orderData = await Order.find({ userId: data.address._id });
                    const removeCart = await User.findOneAndUpdate(
                         { _id: ObjectId(data.address._id) },
                         {
                              $unset: { cartProducts: [] },
                         },
                         { multi: true }
                    );

                    console.log(removeCart);
                    if (orderData && removeCart) {
                         return res.status(200).json({ message: "Order Created..", orderData });
                    }
                    return res.status(500).json({ message: "No Order found in DataBase " });
               }
               return res.status(500).json({ message: "Try Again After Some Thing " });
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong           " });
          }
     },
     getOrder: async (req, res) => {
          user = req.body.user;

          try {
               const orderData = await Order.find({ userId: user });
               if (orderData) {
                    console.log(orderData[0]);
                    return res.status(200).json({ message: "Order fetched", orderData });
               }
               return res.status(500).json({ message: "No Order found in DataBase " });
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong           " });
          }
     },
     cancelOrder: async (req, res) => {
          const user = req.body._id;
          try {
               const order = await Order.deleteOne({ _id: ObjectId(user) });
               if (order) {
                    const orderData = await Order.find({ userId: user });
                    if (orderData) {
                         console.log(orderData[0]);
                         return res.status(200).json({ message: "Order Cancelled", orderData });
                    }
               }
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong           " });
          }
     },
};
