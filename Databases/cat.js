var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temp: String
});

//Create the Cat collection
var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
    name: "George",
    age: 2,
    temp: "Grouchy"
});

george.save(function(err, cat){
    if (err){
        console.log("Something went wrong");
    } else {
       console.log("We've saved the cat");
       console.log(cat);
    }
});