 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");

 app.use(bodyParser.urlencoded({extended: true}));
 app.set("view engine","ejs");

 var campgrounds = [
         {name:"Madrasa", image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
         {name:"Bet Shan", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f4c67baee4b4b1_340.jpg"},
         {name:"Zackaria", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      ]

 app.get("/", function(req, res){
      res.render("landing");
  });

 /* GET: campgrounds */
 app.get("/campgrounds", function(req, res){
      res.render("campgrounds",{campgrounds: campgrounds});
 });

 /* POST: campgrounds */
 app.post("/campgrounds", function(req, res){
      var name = req.body.name;
      var image = req.body.image;
      var newCampground = {name: name, image: image};
      campgrounds.push(newCampground);
      res.redirect("/campgrounds");
  });

 app.get("/campgrounds/new", function(req, res){
      res.render("new");
 });

 app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server started");
 });