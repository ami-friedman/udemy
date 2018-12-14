 var express = require("express");
 var app = express();
 var request = require("request");
 app.set("view engine","ejs");

app.get("/", function(req, res){
      res.render("search");
 });

app.get("/results", function(req, res){
    var term = req.query.term;
    var url = "http://www.omdbapi.com/?s=" + term + "&apikey=241f5078";
    request(url, function(error, response, body){
      var data = JSON.parse(body);
      res.render("results",{data: data});
   });
 });


 app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Server started");
 });