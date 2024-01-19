const express=require('express');
const router=express.Router();
const User = require("../model/userschema");
// const Product = require("../model/product.js");

// cloud
const multer = require("multer");
const{storage} = require("../cloud.js");
const Product = require('../model/product.js');
const upload = multer({storage});


      router.get("/", (req, res) => {
        res.render("index.ejs");
      });
      router.get("/login", (req, res) => {
        res.render("login.ejs");
      });
      router.get("/register", (req, res) => {
        res.render("register.ejs");
      });
      router.get("/product", (req, res) => {
        res.render("product.ejs",{n:null});
      });
    //  uploade product
    router.post("/product",upload.single("product[image]"),async (req,res,next)=>{
      // code for th map coordinates
    let url = req.file.path;
       let filename = req.file.filename;
       console.log(url,"..",filename);
       
       let newProduct = new Product(req.body.product);
      //  cloud service
       newProduct.image= {filename,url};
      //  maps code
      
       let savedListing = await newProduct.save();
       console.log(savedListing);
       
       console.log("added sucessfuly");
       req.flash("sucess","listing added sucessfully");
       res.render("product.ejs",{n:newProduct.image.url});
       
   
});

// router.get("/show",async (req,res)=>{
//   let Product = await Product.find({});

// })




      //register
      router.post('/register',(req,res)=>{
        const {name , email , phone , password , cpassword }=req.body;
        console.log(name);
       if(!name || !email || !phone || !password || !cpassword){
                return res.json({error:'nopes'});
       }
      
       User.findOne({email:email})
       .then((userexist)=>{
        if(userexist){
                return res.json({error:"email already registered"});
        }
        const user=new User({name,email,phone,password,cpassword});
        
        
        user.save().then(()=>{
            res.json({success:"user registered succesfully"});
                // res.render("login");
        }).catch((err)=>res.json({error:"failed to registered"}));
        

       }).catch((err)=>{console.log(err);});




});
//login

      router.post('/login',async(req,res)=>{
        try{
                const{email,password}=req.body;
                if(!email|| !password){
                        return res.alert("fill all details");
                        res.send("please fill all");
                }
                const userlogin=await User.findOne({email:email});
                console.log(userlogin);
                if(userlogin){
                        if(password!=userlogin.password){
                                return res.json({error:"incorrect password"});
                                
                        }else{
                          var n=userlogin.name;
                          var s=userlogin.score;

                                res.json({logedin:"user logged in succesfully"});
                                // res.render("home",{username:n});
                                
                        }
                }else{
                        res.json({error:"email is not registered"});
                }



        }catch(err){
                res.json({error:"error"});
        }
});




module.exports=router;
