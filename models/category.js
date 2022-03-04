const mongoose = require("mongoose")
const connection = require("../utils/database")


const categorySchema = new mongoose.Schema({
    categoryCode: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}
)



const Category = connection.model('Category',categorySchema);
module.exports = Category;