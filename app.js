const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
require('./db/conn');
const path = require("path");
const port = 8000;
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
const session = require("express-session");
// const userRoutes= require("./router/User.js");
const userRoutes= require("./router/authy.js");
// app.use("/",userRoutes);

// cloud storage





app.use(session({
  secret:"mySuperSecertecode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
},
}))
const flash = require("connect-flash");

app.use(flash());

app.use((req,res,next)=>{
  res.locals.sucess = req.flash("sucess");
  // res.locals.errormsg = req.flash("error");
  // res.locals.currUser = req.user;
  next();

});

// checking session
// app.get("/check",(req,res)=>{
//   let {name="shubham"} = req.query;
//   req.session.name=name;
//   req.flash("sucess","user sign in ");
//   res.redirect("/hello");
//   // res.send(name);
// });

// app.get("/hello",(req,res)=>{
//   // res.send(`hello ${req.session.name}`);
//   res.render("page.ejs",{name:req.session.name, msg:req.flash("sucess")})

// });


app.use("/",userRoutes);

app.listen(port, (req, res) => {
    console.log(`listening the port at port ${port}`);
  });
 
// app.get("/",(req,res)=>{
//   res.render("index.ejs");
// })



