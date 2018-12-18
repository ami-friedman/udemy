
const Campground = require("../models/campground"),
      Comment    = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if (err){
                console.log(err);
                return res.redirect("back");
            };
            if (foundCamp.author.id.equals(req.user._id)){
                next();
            } else {
                return res.redirect("back");
            };
        });
    } else {
        return res.redirect("back");
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
                return res.redirect("back");
            };
        });
    } else {
        return res.redirect("back");
    };
}

middlewareObj.isUserLoggedIn = function (req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;
