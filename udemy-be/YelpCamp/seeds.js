var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

var data = [
    {
        name: "Zakaria",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Semper auctor neque vitae tempus quam. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Habitant morbi tristique senectus et netus et. Arcu non odio euismod lacinia. Viverra justo nec ultrices dui sapien. Turpis massa sed elementum tempus egestas sed sed. Nec ultrices dui sapien eget mi proin sed. Tellus in metus vulputate eu. Dictum fusce ut placerat orci nulla pellentesque dignissim. Neque laoreet suspendisse interdum consectetur libero. Tortor consequat id porta nibh venenatis cras sed felis eget. Vitae auctor eu augue ut. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sed viverra ipsum nunc aliquet."
    },
    {
        name: "Emek Ayalon",
        image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Semper auctor neque vitae tempus quam. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Habitant morbi tristique senectus et netus et. Arcu non odio euismod lacinia. Viverra justo nec ultrices dui sapien. Turpis massa sed elementum tempus egestas sed sed. Nec ultrices dui sapien eget mi proin sed. Tellus in metus vulputate eu. Dictum fusce ut placerat orci nulla pellentesque dignissim. Neque laoreet suspendisse interdum consectetur libero. Tortor consequat id porta nibh venenatis cras sed felis eget. Vitae auctor eu augue ut. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sed viverra ipsum nunc aliquet."
    },
    {
        name: "Jeruslaem Forest",
        image: "https://images.unsplash.com/photo-1467357689433-255655dbce4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Semper auctor neque vitae tempus quam. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Habitant morbi tristique senectus et netus et. Arcu non odio euismod lacinia. Viverra justo nec ultrices dui sapien. Turpis massa sed elementum tempus egestas sed sed. Nec ultrices dui sapien eget mi proin sed. Tellus in metus vulputate eu. Dictum fusce ut placerat orci nulla pellentesque dignissim. Neque laoreet suspendisse interdum consectetur libero. Tortor consequat id porta nibh venenatis cras sed felis eget. Vitae auctor eu augue ut. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sed viverra ipsum nunc aliquet."
    },
    {
        name: "Ben Shemesh",
        image: "https://images.unsplash.com/photo-1467357689433-255655dbce4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Semper auctor neque vitae tempus quam. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Habitant morbi tristique senectus et netus et. Arcu non odio euismod lacinia. Viverra justo nec ultrices dui sapien. Turpis massa sed elementum tempus egestas sed sed. Nec ultrices dui sapien eget mi proin sed. Tellus in metus vulputate eu. Dictum fusce ut placerat orci nulla pellentesque dignissim. Neque laoreet suspendisse interdum consectetur libero. Tortor consequat id porta nibh venenatis cras sed felis eget. Vitae auctor eu augue ut. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sed viverra ipsum nunc aliquet."
    }

]

function seedDB(){
    Comment.deleteMany({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Removed comments");
            Campground.deleteMany({}, function(err){
                if (err){
                    console.log(err);
                } else {
                    console.log("Removed Campgrounds");
                    data.forEach(function(campg){
                        Campground.create(campg, function(err, savedCamp){
                            if (err){
                                console.log(err);
                            } else {
                                console.log("Saved new camp");
                                Comment.create(
                                    {
                                        text: "Id aliquet lectus proin nibh nisl condimentum id venenatis a. Vivamus arcu felis bibendum ut tristique et. Amet venenatis urna cursus eget nunc scelerisque. Facilisi morbi tempus iaculis urna. ",
                                        author: "Mark Twain"
                                    },
                                    function (err, newComment){
                                        if (err){
                                            console.log(err);
                                        } else {
                                            savedCamp.comments.push(newComment);
                                            savedCamp.save();
                                            console.log("saved new comment");
                                        }
                                    }
                                )
                            }
            
                        })
                    });
                }
            });

        }

    });
    
}

module.exports = seedDB;

