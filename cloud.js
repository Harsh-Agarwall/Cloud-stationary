// const Cloud_Name = "djxjgkdnr";
// const API_KEY = "883822795995971";
// const API_SECRET = "5aLrQqtb6Q63rHYAg053Qh5YuLg";

const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:  "djxjgkdnr",
    api_key: "883822795995971",
    api_secret: "5aLrQqtb6Q63rHYAg053Qh5YuLg",
});
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Cloud_Stationary",
        allowerdFormats:["png","jpg","jpeg"],

    },
});

module.exports={
    cloudinary,
    storage,
}