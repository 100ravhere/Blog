//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
const composeschema = {
  title:String,
  post:String
};
const Compose = new mongoose.model("Compose",composeschema);



const homeStartingContent = "Read and upload your blogs.";
const aboutContent = "I am Sourav Mehta, I made this blog website so people can read other people blogs and can upload their blogs too.";
const contactContent = "Contact : 100rav (+91-9179371981)";

const app = express();

app.set('view engine', 'ejs' );

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{

  Compose.find({},function(err,result)
{
  res.render("home",{startingContent:homeStartingContent , allpost:result});
})

});
app.get("/posts/:postid",function(req,res)
{
  const reqpostid = req.params.postid;
  Compose.findOne({_id:reqpostid},function(err,result)
  {



    res.render("post",{title:result.title,content:result.post});
  });
});

app.get("/about",function(req,res)
{
  res.render("about",{aboutpageContent:aboutContent});

});
app.get("/contact",function(req,res)
{
  res.render("contact",{contactpageContent:contactContent});

});
app.get("/compose",function(req,res)
{
  res.render("compose");

});
app.post("/compose",function(req,res)
{

    const title = req.body.inputtext;
    const body = req.body.postBody;


  const item = new Compose({
    title:title,
    post:body
  });
  item.save(function(err){

   if (!err){

     res.redirect("/");

   }

});
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
