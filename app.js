const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
require('./db/conn');
const path = require("path");
const port = 8000;
const User=require('./model/userschema');
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require('./router/authy'));

app.listen(port, (req, res) => {
    console.log(`listening the port at port ${port}`);
  });
