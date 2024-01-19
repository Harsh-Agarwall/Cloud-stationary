const mongoose = require("mongoose");

const productSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        filename:String,
        url:String,
       
    },
})

const Product = mongoose.model("Product",productSchema);
module.exports =Product;