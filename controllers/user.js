const User = require("../models/user");
const bcrypt = require("bcrypt");
const serviceSSID = "VA68f7d8d4ec396d16e5886f5f2ed07da9";
const accountSSID = "ACa177557bacd7c7b44f9396397e2922cd";
const authToken = "3fdef5e9103bb0a89fce1c70b65ab136";
const client = require("twilio")(accountSSID, authToken);

module.exports = {
     userSignup: async (req, res) => {
          try {
               req.body.password = await bcrypt.hash(req.body.password, 10);
               console.log(req.body.password);
               console.log("started try");
               const userEmail = await User.findOne({ email: req.body.email });
               const userPhone = await User.findOne({ phone: req.body.phone });

               if (userEmail) return res.status(400).json({ message: "This Email Is Already Registered" });
               if (userPhone) return res.status(400).json({ message: "This Phone Is Already Registered" });

               console.log("new user");
               const newUser = await User.create(req.body);
               res.status(200).json({ message: "Acoount Created Successfully", userData: newUser });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     userLogin: async (req, res) => {
          try {
               console.log(req.body.password);
               console.log("started try");
               const user = await User.findOne({ email: req.body.email });
               if (user) {
                    const result = await bcrypt.compare(req.body.password, user.password);
                    console.log(result);
                    if (result) {
                         const token = user.generateAuthToken();
                         console.log(token);
                         return res.status(200).json({ message: "Login Sucess", token, userName: user.name, userId: user._id, user });             
                    }

                    return res.status(500).json({ message: "Password Doesnot Match" });
               }
               return res.status(500).json({ message: "No User Found" });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },

     mobileLogin: async (req, res) => {
          console.log(req.body);
          try {
               const user = await User.findOne({ phone: req.body.phone });
               if (!user) return res.status(404).json({ message: "User Not Found", userStatus: true });
               console.log("userfound");
               if (!user.active) return res.status(404).json({ message: "User Blocked", userStatus: user.active });
               const send = await client.verify.services(serviceSSID).verifications.create({
                    to: `+91${req.body.phone}`,
                    channel: "sms",
               });

               if (!send) return res.status(404).json({ message: "Try Again Later", userStatus: true });

               return res.status(200).json({ message: "OTP Send to your mobile number" });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong", userStatus: true });
          }
     },
     otpLogin: async (req, res) => {
          console.log(req.body.otp);
          try {
               const isOTP = await client.verify.services(serviceSSID).verificationChecks.create({
                    to: `+91${req.body.phone}`,
                    code: req.body.otp,
               });
               if (isOTP.valid) {
                    const user = await User.findOne({ phone: req.body.phone });
                    const token = user.generateAuthToken();
                    console.log(user);
                    return res
                         .status(200)
                         .json({ message: "Login Sucess", token, userName: user.name, userId: user._id, user });
               } else {
                    return res.status(500).json({ message: "something went wrong" });
               }
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
};
