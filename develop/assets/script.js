startEl = document.querySelector('#start');
questionEl = document.querySelector('#quizHeader');
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
    quizFirst();
    startTimer();
}
function startTimer(){
    var timerInterval = setInterval(function() {
        secondsLeft --;
        timerEl.textContent= secondsLeft + " seconds remaining"
        if (secondsLeft === 0) {
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
function quizFirst(){
    quizEl.style.visibility = "visible";
    questionEl.textContent = "Which of these is not a main programming language?"
    answerA.textContent = "Console";
    answerB.textContent = "Html";
    answerC.textContent = "Javascript"
    answerD.textContent = "Css";
    answerA.addEventListener("click", quizSecond);
    answerB.addEventListener("click", penaltyFirst);
    answerC.addEventListener("click", penaltyFirst);
    answerD.addEventListener("click", penaltyFirst);
}
//Currently, the event listeners for the penalty are still there, triggering for wrong answers even after that set of questions. Look into wiping the slate.
function penaltyFirst(){
    secondsLeft -= 10;
    penaltyEl.textContent="Wrong!";
    quizSecond();
}
//Look into consolidating the penalty functions, is it possible for an event to listen for clicking on a changing data attribute?
function quizSecond(){
    questionEl.textContent = "Which of these is not a primitive variable?";
    answerA.textContent = "Boolean";
    answerB.textContent = "String";
    answerC.textContent = "Array";
    answerD.textContent = "Number";
    answerA.addEventListener("click", penaltySecond);
    answerB.addEventListener("click", penaltySecond);
    answerC.addEventListener("click", quizThird);
    answerD.addEventListener("click", penaltySecond);
}
function penaltySecond(){
    secondsLeft -= 10;
    penaltyEl.textContent="Wrong!";
    quizThird();
}
function quizThird(){
    questionEl.textContent = "Which of these is a self-closing tag?";
    answerA.textContent = "img";
    answerB.textContent = "p";
    answerC.textContent = "body";
    answerD.textContent = "div";
    answerA.addEventListener("click", quizFourth);
    answerB.addEventListener("click", penaltyThird);
    answerC.addEventListener("click", penaltyThird);
    answerD.addEventListener("click", quizFourth);
}
function penaltyThird(){
    secondsLeft -=10;
    penaltyEl.textContent="Wrong!";
    quizFourth();
}
function quizFourth(){
    questionEl.textContent = "What is the outermost layer of the box?";
    answerA.textContent = "Padding";
    answerB.textContent = "Margin";
    answerC.textContent = "Content";
    answerD.textContent = "Border";
    answerA.addEventListener("click", penaltyFourth);
    answerB.addEventListener("click", quizEnd);
    answerC.addEventListener("click", penaltyFourth);
    answerD.addEventListener("click", penaltyFourth);
}
function penaltyFourth(){
    secondsLeft -=10;
    penaltyEl.textContent="Wrong!";
    quizEnd();
}
function quizEnd(){
    if (secondsLeft > 0){
        isWin = true;
    }
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