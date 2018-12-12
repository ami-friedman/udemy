 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");

 app.use(bodyParser.urlencoded({extended: true}));

 app.set("view engine","ejs");

 app.get("/", function(req, res){
    res.render("home");
 });


app.post("/addfriend", function(req, res){
    console.log(req.body);
    res.send("YOu have reached POST!!");
 });

 app.get("/friends", function(req, res){
    var friends = ["Chaim","Yaakov", "Shmuli"];
    res.render("friends",{friends: friends});
 });


 app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server started");
 });