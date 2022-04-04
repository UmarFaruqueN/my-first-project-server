const express = require("express");
const router = express.Router();

const { adminSignup, adminLogin, getUsers, updateUserStatus, updateUser, deleteUser } = require("../controllers/admin");
const { getAllOrder, updateOrder } = require("../controllers/order");
const { addOffer ,deleOffer} = require("../controllers/offers");

//middleware

//api routes
router.post("/adminSignup", adminSignup);
router.post("/adminLogin", adminLogin);
router.get("/getUsers", getUsers);
router.post("/updateUserStatus", updateUserStatus);
router.post("/updateUser", updateUser);
router.post("/deleteUser", deleteUser);
router.get("/getAllOrder", getAllOrder);
router.post("/updateOrder", updateOrder);
router.post("/addOffer", addOffer);
router.post("/deleOffer", deleOffer);

module.exports = router;
