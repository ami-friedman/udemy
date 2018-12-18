const   express               = require("express"),
        router                = express.Router({mergeParams: true}),
        Campground            = require("../models/campground"),
        Comment               = require("../models/comment"),
        middlware             = require("../middleware");

// Comment NEW: Get
router.get("/new", middlware.isUserLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err)
        } else {
            res.render("./comments/new", {campground: campground});
        }
     });
})

//Comment CREATE: Post
router.post("/", middlware.isUserLoggedIn, function(req, res){
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
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                     //associate it to the campground
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//Comment EDIT: get
router.get("/:comment_id/edit", middlware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            return res.redirect("back");
        }
        return res.render("./comments/edit", {campground_id: req.params.id, comment: foundComment});
    });
});

//Comment UPDATE: put
router.put("/:comment_id", middlware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id ,req.body.comment, function(err, updatedComment){
        if (err){
            return res.redirect("back");
        }
        return res.redirect("/campgrounds/" + req.params.id);
    });
})

//Comment DESTROY: delete
router.delete("/:comment_id", middlware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            return res.redirect("back");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});


module.exports = router;