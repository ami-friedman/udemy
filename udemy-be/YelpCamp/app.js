
const express               = require("express"),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      app                   = express(),
      seedDB                = require("./seeds"),
      methodOverride        = require("method-override"),
      passport              = require("passport"),
      localStrategy         = require("passport-local"),
      expressSession        = require("express-session"),
      User                  = require("./models/user");

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

//seedDB();

app.use(expressSession({ secret: "my secret text", resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});



app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
   console.log("Server started");
});