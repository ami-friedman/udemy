console.log("Connected");
var list = [];

window.setTimeout(function () {
    var input = prompt("What would you like to do?");
    //console.log(list);
    while (input !== "quit") {
        if (input === "list") {
            console.log(list);
        }
        else if (input === "new") {
            var newItem = prompt("What would you like to add?");
            list.push(newItem);
        }
        input = prompt("What would you like to do?");
    }


}, 500);
console.log("You have quit");