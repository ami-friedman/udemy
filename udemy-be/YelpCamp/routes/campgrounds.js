const   express               = require("express"),
        router                = express.Router({mergeParams: true}),
        Campground            = require("../models/campground");
        middlware             = require("../middleware");
      

/* INDEX: campgrounds */
router.get("/", function(req, res){
    Campground.find({},function(err,campgrounds){
     if (err){
         console.log(err);
     } else{
         res.render("./campgrounds/index",{campgrounds: campgrounds});
     }

    });
});

/* CREATE: campgrounds */
router.post("/", middlware.isUserLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, campground){
        if (err){
            console.log(err)
        } else {
            res.redirect("/campgrounds");
        }
    });
});

/* NEW: campgrounds/new*/
router.get("/new", middlware.isUserLoggedIn, function(req, res){
    res.render("./campgrounds/new");
});

/* SHOW: campgrounds/:id*/
router.get("/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
      if (err){
          console.log(err)
      } else {
          res.render("./campgrounds/show",{campground: campground});
      }
   });
});

/* EDIT: campgrounds/:id/ edit */
router.get("/:id/edit", middlware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function(err, foundCamp){
        if (err){
            console.log(err);
            return res.redirect("/campground/" + req.params.id);
        } 
        res.render("./campgrounds/edit", {campground: foundCamp});
    });
});

/* UPDATE: campgrounds/:id edit */
router.put("/:id", middlware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if (err){
            console.log(err);
        } 
        //Regardless of failure or success I want to retrun to the SHOW page
        return res.redirect("/campgrounds/" + req.params.id);
    });

});

/* DESTORY: /:id  */
router.delete("/:id", middlware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err){
            console.log(err);
        }
        res.redirect("/campgrounds");
    })

});

module.exports = router;