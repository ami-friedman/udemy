console.log("Connected");

/* Player 1 */
var p1Button = document.querySelector("#p1button");
var p1ScoreDisplay = document.querySelector("#p1Score");
var p1Score = 0;

/* Player 2 */
var p2Button = document.querySelector("#p2button");
var p2ScoreDisplay = document.querySelector("#p2Score");
var p2Score = 0;

var resetScore = document.querySelector("#reset");

var endScore = 5;
var isGameOver = false;

var inputScore = document.querySelector("input");
var endScoreDisplay = document.querySelector("#endScore");

function reset() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1ScoreDisplay.textContent = p1Score;
    p1ScoreDisplay.classList.remove("winner");

    p2ScoreDisplay.textContent = p2Score;
    p2ScoreDisplay.classList.remove("winner");
}

p1Button.addEventListener("click", function () {
    if (!isGameOver){
        p1Score++;
        p1ScoreDisplay.textContent = p1Score;
        if (p1Score === endScore){
            isGameOver = true;
            p1ScoreDisplay.classList.add("winner");
        }
    }    
})

p2Button.addEventListener("click", function () {
    if (!isGameOver){
        p2Score++;
        p2ScoreDisplay.textContent = p2Score;
        if (p2Score === endScore){
            isGameOver = true;
            p2ScoreDisplay.classList.add("winner");
        }
    }    
})

resetScore.addEventListener("click", function(){
    reset();
});

inputScore.addEventListener("change", function(){
    endScoreDisplay.textContent = this.value;
    endScore = Number(this.value);
    reset();
});

