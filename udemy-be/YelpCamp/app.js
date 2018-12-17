var express    = require("express"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground")
    mongoose   = require("mongoose"),
    app        = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

app.get("/", function(req, res){
     res.render("landing");
 });

/* INDEX: campgrounds */
app.get("/campgrounds", function(req, res){
     Campground.find({},function(err,campgrounds){
      if (err){
          console.log(err);
      } else{
          res.render("index",{campgrounds: campgrounds});
      }

     });
});

/* CREATE: campgrounds */
app.post("/campgrounds", function(req, res){
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var newCampground = {name: name, image: image, description: desc};
     Campground.create(newCampground, function(err, campground){
         if (err){
             console.log(err)
         } else {
             console.log("saved new campground:");
             console.log(campground);
             res.redirect("/campgrounds");
         }
     });
 });

 /* NEW: campgrounds/new*/
app.get("/campgrounds/new", function(req, res){
     res.render("new");
});

/* SHOW: campgrounds/:id*/
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err,campground){
       if (err){
           console.log(err)
       } else {
           res.render("show",{campground: campground});
       }
    });

});

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Server started");
});