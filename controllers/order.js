const { ObjectId } = require("mongodb");
const Order = require("../models/order");
const User = require("../models/user");

module.exports = {
     getAllOrder: async (req, res) => {
          console.log("getALLOrder");
          try {
               const orderData = await Order.find();
               if (orderData) {
                    const allOrders = orderData.reverse();
                    res.status(200).json({
                         message: " Orders Fetched Successfully",
                         allOrders,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Orders from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     addOrder: async (req, res) => {
          console.log("started Add order");
          const data = req.body;

          const details = {
               userId: data.address._id,
               name: data.address.name,
               phone: data.address.phone,
               address: data.address.address,
               products: data.products,
               subtotal: data.subtotal,
               shipping: data.shipping,
               discount: data.discount,
               total: data.total,
               paymentType: data.paymentType,
               orderTime: data.orderTime,
               orderStatus: "User Ordered",
               statusTime: data.orderTime,
               day: data.orderDay,
               month: data.orderMonth,
               weekNumber: data.weekNumber,
          };

          try {
               const newOrder = await Order.create(details);
               if (newOrder) {
                    const allOrder = await Order.find({ userId: data.address._id });
                    const orderData = allOrder.reverse();
                    const removeCart = await User.findOneAndUpdate(
                         { _id: ObjectId(data.address._id) },
                         {
                              $unset: { cartProducts: [] },
                         },
                         { multi: true }
                    );

                    console.log(removeCart);
                    if (orderData) {
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
               const allOrder = await Order.find({ userId: user });
               if (allOrder) {
                    console.log(orderData[0]);

                    const orderData = allOrder.reverse();
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
          const date = req.body.orderDate;
          try {
               const order = await Order.findOneAndUpdate(
                    { _id: ObjectId(user) },
                    { $set: { orderStatus: "User Cancelled", statusTime: date } }
               );
               if (order) {
                    const allOrder = await Order.find({ userId: user });
                    if (allOrder) {
                         console.log(allOrder[0]);
                         const orderData = allOrder.reverse();
                         return res.status(200).json({ message: "Order Cancelled", orderData });
                    }
               }
          } catch (error) {
               console.log(error);
               return res.status(500).json({ message: "Something went wrong" });
          }
     },
     updateOrder: async (req, res) => {
          const { _id, status } = req.body;

          console.log(_id);
          try {
               const updateOrder = await Order.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { orderStatus: status } });
               if (updateOrder) {
                    const orderData = await Order.find();
                    if (orderData) {
                         const allOrders = orderData.reverse();
                         res.status(200).json({
                              message: " Status Updated Successfully",
                              allOrders,
                         });
                    } else {
                         return res.status(500).json({ message: " Status didnt Updated" });
                    }
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
     getSales: async (req, res) => {
          console.log("getSales");
          try {
               const Orders = await Order.find({ orderStatus: "User Ordered" });
               const Sales = await Order.find({ orderStatus: "Item Delivered" });
               const Shipped = await Order.find({ orderStatus: "Item Shipped" });
               const Cancelled = await Order.find({ orderStatus: "User Cancelled" });
               res.status(200).json({
                    message: " Data Fetched Successfully",
                    Orders,
                    Sales,
                    Shipped,
                    Cancelled,
               });
          } catch (error) {
               console.log(error);
          }
     },
};
