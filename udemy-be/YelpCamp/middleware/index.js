
const Campground = require("../models/campground"),
      Comment    = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if (err){
                console.log(err);
                return res.redirect("/campgrounds");
            };
            if (foundCamp.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have persmissions for that!");
                return res.redirect("/campgrounds");
            };
        });
    } else {
        req.flash("error", "Please login");
        return res.redirect("/login");
    };
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log(err);
                return res.redirect("back");
            };
            if (foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have persmissions for that!");
                return res.redirect("/login");
            };
        });
    } else {
        req.flash("error", "Please login");
        return res.redirect("/login");
    };
}

middlewareObj.isUserLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login");
    res.redirect("/login");
}


module.exports = middlewareObj;
