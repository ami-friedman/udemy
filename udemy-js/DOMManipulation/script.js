console.log("Connected");

var but = document.querySelector("button");

//solution #1
// isPurple = false;

// but.addEventListener("click", function () {
//     if (isPurple){
//         document.body.style.backgroundColor = "white";
//     }
//     else {
//         document.body.style.backgroundColor = "purple";
//     }
//     isPurple = !isPurple;
// })

//solution #2
but.addEventListener("click", function () {
    document.body.classList.toggle("purple");
})


