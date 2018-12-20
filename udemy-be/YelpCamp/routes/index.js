const   express               = require("express"),
        router                = express.Router({mergeParams: true}),
        passport              = require("passport"),
        User                  = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({username: req.body.username }), req.body.password, (err, newUser) => {
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}));

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;
