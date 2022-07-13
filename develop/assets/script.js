startEl = document.querySelector('#start');
questionEl = document.querySelector('#quizHeader');
answersEl = document.querySelectorAll('.answers')
answerA = document.querySelector('#quizA');
answerB = document.querySelector('#quizB');
answerC = document.querySelector('#quizC');
answerD = document.querySelector('#quizD');
penaltyEl = document.querySelector('#penaltyText')
timerEl = document.querySelector('#timer');
resetBtn = document.querySelector('#reset');
quizEl = document.querySelector('.quizContain');
var secondsLeft = 60;
var isWin = false;

function startQuiz(){
    startTimer();
    quizFirst();
}
function startTimer(){
    //Putting the penalty checks in the timer function to try to impact the timer text count.
    var timerInterval = setInterval(function() {
        secondsLeft --;
        answerA.addEventListener("click", penaltyCheck);
        answerB.addEventListener("click", penaltyCheck);
        answerC.addEventListener("click", penaltyCheck);
        answerD.addEventListener("click", penaltyCheck);
        timerEl.textContent= secondsLeft + " seconds remaining";
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            youLose();
        }
        if (secondsLeft > 0){
            if (isWin === true && secondsLeft > 0){
                clearInterval(timerInterval);
                youWin();
            }
        }
    }, 1000);
}
function penaltyCheck(event){
    console.log(event.target);
    var state = event.target.getAttribute("data-state");
    if (state == "correct") {
        penaltyEl.textContent="Correct!";
    }
    else {
        secondsLeft -= 10;
        console.log(secondsLeft);
        penaltyEl.textContent="Wrong!";
    }
}
//This doesn't work yet, need to rewrite the code to clear the buttons of all eventlisteners.
function reset(){
    isWin = false;
    penaltyEl.textContent="";
    secondsLeft = 60;
    quizEl.style.visibility = "hidden";
    //answerA.removeEventListener("click");
    //answerB.removeEventListener("click");
    //answerC.removeEventListener("click");
    //answerD.removeEventListener("click");
}

function quizFirst(){
    secondsLeft = 60;
    quizEl.style.visibility = "visible";
    questionEl.textContent = "Which of these is not a main programming language?"
    answerA.textContent = "Console";
    answerA.setAttribute("data-state", "correct");
    answerB.textContent = "Html";
    answerB.setAttribute("data-state", "wrong");
    answerC.textContent = "Javascript"
    answerC.setAttribute("data-state", "wrong");
    answerD.textContent = "Css";
    answerD.setAttribute("data-state", "wrong");
    answerA.addEventListener("click", quizSecond);
    answerB.addEventListener("click", quizSecond);
    answerC.addEventListener("click", quizSecond);
    answerD.addEventListener("click", quizSecond);
}
//Currently seeing a bug where penaltycheck uses the updated data state rather than the one at the time of clicking. Need to make penaltycheck happen before any of the quiz functions.
//After hitting the reset, all of the old event clickers are still there, sending the quiz back to the state where it was before reset once a button is clicked. Look into removing event listeners.
function quizSecond(){
    questionEl.textContent = "Which of these is not a primitive variable?";
    answerA.textContent = "Boolean";
    answerA.removeEventListener("click", quizFirst);
    answerA.setAttribute("data-state", "wrong")
    answerB.textContent = "String";
    answerB.removeEventListener("click", quizFirst);
    answerB.setAttribute("data-state", "wrong")
    answerC.textContent = "Array";
    answerC.removeEventListener("click", quizFirst);
    answerC.setAttribute("data-state", "correct")
    answerD.textContent = "Number";
    answerD.removeEventListener("click", quizFirst);
    answerD.setAttribute("data-state", "wrong")
    answerA.addEventListener("click", quizThird);
    answerB.addEventListener("click", quizThird);
    answerC.addEventListener("click", quizThird);
    answerD.addEventListener("click", quizThird);
}

function quizThird(){
    questionEl.textContent = "Which of these is a self-closing tag?";
    answerA.textContent = "img";
    answerA.setAttribute("data-state", "correct");
    answerB.textContent = "p";
    answerB.setAttribute("data-state", "wrong");
    answerC.textContent = "body";
    answerC.setAttribute("data-state", "wrong");
    answerD.textContent = "div";
    answerD.setAttribute("data-state", "wrong");
    answerA.addEventListener("click", quizFourth);
    answerB.addEventListener("click", quizFourth);
    answerC.addEventListener("click", quizFourth);
    answerD.addEventListener("click", quizFourth);
    answerA.removeEventListener("click", quizSecond);
    answerB.removeEventListener("click", quizSecond);
    answerC.removeEventListener("click", quizSecond);
    answerD.removeEventListener("click", quizSecond);
}

function quizFourth(){
    questionEl.textContent = "What is the outermost layer of the box?";
    answerA.textContent = "Padding";
    answerA.setAttribute("data-state", "wrong");
    answerB.textContent = "Margin";
    answerB.setAttribute("data-state", "correct");
    answerC.textContent = "Content";
    answerC.setAttribute("data-state", "wrong");
    answerD.textContent = "Border";
    answerD.setAttribute("data-state", "wrong");
    answerA.addEventListener("click", quizEnd);
    answerB.addEventListener("click", quizEnd);
    answerC.addEventListener("click", quizEnd);
    answerD.addEventListener("click", quizEnd);
    answerA.removeEventListener("click", quizFourth);
    answerB.removeEventListener("click", quizFourth);
    answerC.removeEventListener("click", quizFourth);
    answerD.removeEventListener("click", quizFourth);
}

function quizEnd(){
    if (secondsLeft > 0){
        isWin = true;
    }
    answerA.removeEventListener("click", quizFourth);
    answerB.removeEventListener("click", quizFourth);
    answerC.removeEventListener("click", quizFourth);
    answerD.removeEventListener("click", quizFourth);
}
function youWin() {
    var initialWinner = prompt("Congratulations, you win! Please enter your initials for the scoreboard.")
    var highScore = {
        User: initialWinner,
        Time: secondsLeft,
    }
    localStorage.setItem("High Scores", JSON.stringify(highScore));
}
function youLose() {
    questionEl.textContent = "Sorry, time's up!";
}
startEl.addEventListener("click", startQuiz);
resetBtn.addEventListener("click", reset);