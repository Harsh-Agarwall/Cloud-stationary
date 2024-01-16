const mongoose =require("mongoose");
const express = require("express");
const app = express();
const hbs=require("hbs");
const path = require("path");
require('./db/conn');
const User=require('./model/userschema');
const port=8000;


const staticpath = path.join(__dirname, "./public");


const templatespath = path.join(__dirname, "./templates/views");
const partialspath = path.join(__dirname, "./templates/partials");


app.use(express.static(staticpath));


app.set("view engine", "hbs");


app.set("views",templatespath);


hbs.registerPartials(partialspath);

app.use(express.json());


app.use(express.urlencoded({extended:false}));


app.use(require('./router/authy'));

app.listen(port, (req, res) => {
    console.log(`listening the port at port ${port}`);
  });