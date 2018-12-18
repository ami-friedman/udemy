const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      sessions = require("client-sessions"),
      bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost/ss-auth", { useNewUrlParser: true });

let app = express();

app.use(sessions({
    cookieName: "session",
    secret: "asfjul09il",
    duration: 30 * 60 * 1000
}))

app.use((req, res, next) => {
    if (!(req.session && req.session.userId)){
        return next();
    }

    User.findById(req.session.userId, (err, user) => {
        if (err){
            return next(err);
        }

        if (!user){
            return next();
        }

        user.password = undefined;

        req.user = user;
        res.locals.user = user;
        next();
    })
})

let User = mongoose.model("User", new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}))

app.set("view engine","pug");
app.use(bodyParser.urlencoded({extended: false}));

function loginRequired(req, res, next){
    if (!req.user){
        return res.redirect("/login");
    }

    next();
}

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash; 
    let user = new User(req.body);

    user.save((err) => {
        if (err){
            let error = "Something went wrong! Please try again"

            if (err.code === 11000) {
                error = "That e-mail has already been taken"
            }
            return res.render("register", {error: error});
        }

        res.redirect("/dashboard");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render("login", {error: "Incorrect email / password"});
        }
        req.session.userId = user._id;
        res.redirect("/dashboard");
    })

});

app.get("/dashboard", loginRequired, (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user){
            return res.redirect("/login");
        }

        return res.render("dashboard");

    });
});

app.get("/logout", (req, res) => {
    req.user = undefined;
    req.session.reset();
    return res.redirect("/login");
})



app.listen(3000);