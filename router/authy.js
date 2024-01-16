const express=require('express');
const router=express.Router();
const User = require("../model/userschema");


      router.get("/", (req, res) => {
        res.render("index.ejs");
      });






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

router.get("/shubham",(req,res)=>{
        res.send("working");
})


module.exports=router;
