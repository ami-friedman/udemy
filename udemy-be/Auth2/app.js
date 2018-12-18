const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      localStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      expressSession        = require("express-session"),
      User                  = require("./models/user");


mongoose.connect("mongodb://localhost/secret-db", { useNewUrlParser: true } );


let app = express();

app.use(expressSession({ secret: "my secret text", resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//======================
//     ROUTES


app.get("/", (req, res) => {
    res.render("home");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username }), req.body.password, (err, newUser) => {
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        })
    })
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {successRedirect: "/secret" , failureRedirect: "login"}), (req, res) => {});

app.listen(3000, () => {
    console.log("Started.....")
});
    

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
})

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

}
