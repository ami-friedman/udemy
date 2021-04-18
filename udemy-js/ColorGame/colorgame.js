console.log("connected");

var squares = document.querySelectorAll(".square");
var colorToGuessDisplay = document.querySelector("span");
var resetButton = document.querySelector("#reset");
var feedbackText = document.querySelector("#feedbackText");
var hardButton = document.querySelector("#hard");
var easydButton = document.querySelector("#easy");

var currentGameLevel = 6;

init();

function init() {
    reset(currentGameLevel);
    setupListeners();
}

function setupListeners() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            if (this.style.backgroundColor === colorToGuessDisplay.textContent) {
                feedbackText.textContent = "Correct!";
                for (var i = 0; i < currentGameLevel; i++) {
                    squares[i].style.backgroundColor = this.style.backgroundColor;
                    squares[i].style.visibility = "visible";
                    document.querySelector("h1").style.backgroundColor = this.style.backgroundColor;
                    resetButton.textContent = "Play Again";
                }
            }
            else {
                feedbackText.textContent = "Try Again!";
                this.style.backgroundColor = "black";
            }
        });
    }

    resetButton.addEventListener("click", function () {
        reset(currentGameLevel);
    });

    hardButton.addEventListener("click", function () {
        this.classList.add("active");
        easydButton.classList.remove("active");
        currentGameLevel = 6;
        reset(currentGameLevel);
    })

    easydButton.addEventListener("click", function () {
        this.classList.add("active");
        hardButton.classList.remove("active");
        currentGameLevel = 3;
        reset(currentGameLevel);
    });

}

function reset(numOfColors) {
    feedbackText.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.visibility = "hidden";
    }
    for (var i = 0; i < numOfColors; i++) {
        squares[i].style.visibility = "visible";
        squares[i].style.backgroundColor = randomRGB();
        var newColor = squares[randomize(currentGameLevel)].style.backgroundColor;
        colorToGuessDisplay.textContent = newColor;
        colorToGuessDisplay.style.backgroundColor = newColor;
        document.querySelector("h1").style.backgroundColor = "steelblue";
    }
}

function randomRGB() {
    var r = randomize(256);
    var g = randomize(256);
    var b = randomize(256);
    return ("rgb(" + r + ", " + g + ", " + b + ")");
}


/* Retruns a randome number between 0 and number. number is NOT included in the result */
function randomize(number) {
    return Math.floor(Math.random() * number);
}





