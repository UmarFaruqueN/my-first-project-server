const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Type = require("../models/type");
var objectId = require("mongodb").ObjectId;

module.exports = {
     addProduct: async (req, res) => {
          console.log("started controller");
          console.log(req.body);
          try {
               const ModelNumberData = await Product.findOne({ ModelNumber: req.body.ModelNumber });
               const ProductNameData = await Product.findOne({ ProductName: req.body.ProductName });

               if (ModelNumberData) return res.status(400).json({ message: "This Model Number Is Already Exist" });
               if (ProductNameData) return res.status(400).json({ message: "This Product Name Is Already Exist" });

               const newProduct = await Product.create(req.body);
               const allProduct = await Product.find();

               return res.status(200).json({ message: " Product Created Successfully", allProduct });
          } catch (error) {
               console.log(error.message);
               return res.status(500).json({ message: "something went wrong" });
          }
     },
     getProduct: async (req, res) => {
          console.log("on controller");
          try {
               const allProduct = await Product.find();
               const allCategory = await Category.find();
               const allSubCategory = await SubCategory.find();
               const allType = await Type.find();

               if (allProduct) {
                    // console.log(ProductData[0]);
                    res.status(200).json({
                         message: " Product Fetched Successfully",
                         allProduct,
                         allCategory,
                         allSubCategory,
                         allType,
                    });
               } else {
                    return res.status(500).json({ message: "didnt got Product from database" });
               }
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },

     deleteProduct: async (req, res) => {
          try {
               console.log(req.body);

               await Product.remove({ _id: objectId(req.body._id) });
               const productData = await Product.find({});
               return res.status(200).json({ message: "product Deleted", productData });
          } catch (error) {
               console.log(error.message);
               res.status(500).json({ message: "something went wrong" });
          }
     },
};
