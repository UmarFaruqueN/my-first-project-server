const express = require("express");
const router = express.Router();

const { adminSignup, adminLogin, getUsers, updateUserStatus, updateUser, deleteUser } = require("../controllers/admin");
const { getAllOrder ,updateOrder} = require("../controllers/order");

//middleware

//api routes
router.post("/adminSignup", adminSignup);
router.post("/adminLogin", adminLogin);
router.get("/getUsers", getUsers);
router.post("/updateUserStatus", updateUserStatus);
router.post("/updateUser", updateUser);
router.post("/deleteUser", deleteUser);
router.get("/getAllOrder", getAllOrder);
router.post("/updateOrder",updateOrder)

module.exports = router;
