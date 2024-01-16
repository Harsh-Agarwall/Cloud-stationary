const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));

const User=require('./model/userschema');


app.use(express.json());
app.use(require('./router/authy'));

app.listen(port, (req, res) => {
    console.log(`listening the port at port ${port}`);
  });
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });