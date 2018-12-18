var express    = require("express"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    mongoose   = require("mongoose"),
    app        = express(),
    seedDB     = require("./seeds");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

seedDB();

app.get("/", function(req, res){
     res.render("landing");
 });

/* INDEX: campgrounds */
app.get("/campgrounds", function(req, res){
     Campground.find({},function(err,campgrounds){
      if (err){
          console.log(err);
      } else{
          res.render("./campgrounds/index",{campgrounds: campgrounds});
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
     res.render("./campgrounds/new");
});

/* SHOW: campgrounds/:id*/
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
       if (err){
           console.log(err)
       } else {
           console.log(campground);
           res.render("./campgrounds/show",{campground: campground});
       }
    });

});

/**
================
Comments routes
===============
*/
// Comment NEW: Get
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err)
        } else {
            console.log(campground);
            res.render("./comments/new", {campground: campground});
        }
     });
})

//Comment CREATE: Post
app.post("/campgrounds/:id/comments", function(req, res){
    //find the campground
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            //create a new comment
            Comment.create(req.body.comment, function(err, newComment){
                if (err){
                    console.log(err);
                } else {
                     //associate it to the campground
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    
   

});

app.listen(3000, function(){
   console.log("Server started");
});