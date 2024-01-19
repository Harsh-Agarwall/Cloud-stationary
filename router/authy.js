const express=require('express');
const router=express.Router();
const User = require("../model/User.js");
const mongoose = require("mongoose");
const passport = require("passport");
const local = require("passport-local");


      router.get("/", (req, res) => {
        res.render("index.ejs");
      });
     
      router.get("/signup", (req, res) => {
        res.render("signup.ejs");
      });

//  sign up
router.post("/signup", async (req,res)=>{
        try {
        let {email,username,password} = req.body;
        let newUser = new User({
              email:email,
              username:username,
        });
        let result = await User.register(newUser,password);
        console.log(result);
        req.flash("sucess","User Registered Sucessfully");
        res.redirect("/");
} catch(e) {
     req.flash("error",e.message);
     res.redirect("/signup");
}
})

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    req.flash("sucess","logged in Sucessfully!!")
    res.redirect('/');
  });




  router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
      if(err) {
        return next(err);
      }
      req.flash("sucess","You are Logged Out");
      res.redirect("/");
    })
  })





//       //register
//       router.post('/register',(req,res)=>{
//         const {name , email , phone , password , cpassword }=req.body;
//         console.log(name);
//        if(!name || !email || !phone || !password || !cpassword){
//                 return res.json({error:'nopes'});
//        }
      
//        User.findOne({email:email})
//        .then((userexist)=>{
//         if(userexist){
//                 return res.json({error:"email already registered"});
//         }
//         const user=new User({name,email,phone,password,cpassword});
        
        
//         user.save().then(()=>{
//             res.json({success:"user registered succesfully"});
//                 // res.render("login");
//         }).catch((err)=>res.json({error:"failed to registered"}));
        

//        }).catch((err)=>{console.log(err);});




// });
// //login

//       router.post('/login',async(req,res)=>{
//         try{
//                 const{email,password}=req.body;
//                 if(!email|| !password){
//                         return res.alert("fill all details");
//                         res.send("please fill all");
//                 }
//                 const userlogin=await User.findOne({email:email});
//                 console.log(userlogin);
//                 if(userlogin){
//                         if(password!=userlogin.password){
//                                 return res.json({error:"incorrect password"});
                                
//                         }else{
//                           var n=userlogin.name;
//                           var s=userlogin.score;

//                                 res.json({logedin:"user logged in succesfully"});
//                                 // res.render("home",{username:n});
                                
//                         }
//                 }else{
//                         res.json({error:"email is not registered"});
//                 }



//         }catch(err){
//                 res.json({error:"error"});
//         }
// });




module.exports=router;
