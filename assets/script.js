//PAGES THAT NEED JS: QUESTIONS, END, HS (ONLY CLEAR LOCAL STORAGE)
//VARIABLES
var timerEl = document.getElementById("countdown");
//pages
var beginScreenEl = document.getElementById("begin-screen");
var questionScreenEl = document.getElementById("question-screen");
var timeOutScreenEl = document.getElementById("time-out");
var endScreenEl = document.getElementById("end-screen");
var HSScreenEl = document.getElementById("high-score");
//buttons
var startGame = document.getElementById("start-game");
var viewHS = document.getElementById("view-hs");
var clearStorage = document.getElementById("clear-scores");
// var testButton = document.getElementById("answer-one");

var questions = [
    {
        question: "choose first answer",
        answerA: "choose me",
        answerB: "wrong",
        answerC: "wrong",
        answerD: "wrong",
        correctAnswer: "answerA"
    }
];



//FUNCTIONS
//CLEAR LOCAL STORAGE
var clearLocalStorage = function () {
    localStorage.clear();
};

//FROM START SCREEN TO QUESTION SCREEN
var goToQuestions = function () {
    if (beginScreenEl.style.display === "none") {
        beginScreenEl.style.display = "block";
        questionScreenEl.style.display = "none";
    } else {
        beginScreenEl.style.display = "none";
        questionScreenEl.style.display = "flex";
    }

    //handleQuestions();
    startTimer();
};

//FROM START SCREEN TO HIGH SCORE SCREEN
var goToHS = function () {
    HSScreenEl.style.display = "block";
    beginScreenEl.style.display = "none";
};

//START COUNTDOWN WHEN QUESTION SCREEN IS LOADED
var startTimer = function () {
    var timeLeft = 5;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;

            timeLeft--;
        } else {
            timerEl.textContent = 0;

            clearInterval(timeInterval);

            timeOut();
        }

    }, 1000);
};

//GO TO TIME OUT PAGE WHEN TIMER = 0
var timeOut = function () {
    if (questionScreenEl.style.display === "none") {
        questionScreenEl.style.display = "flex";
        timeOutScreenEl.style.display = "none"
    } else {
        questionScreenEl.style.display = "none";
        timeOutScreenEl.style.display = "flex";
    }
};

var handleQuestions = function () {

};

//FROM QUESTION SCREEN TO END SCREEN (change to be from all answers/time out to end screen)
// var goToEnd = function () {
//     if (questionScreenEl.style.display === "none") {
//         questionScreenEl.style.display = "flex";
//         endScreenEl.style.display = "none"
//     } else {
//         questionScreenEl.style.display = "none";
//         endScreenEl.style.display = "flex";
//     }
// };










//EVENT LISTENERS
clearStorage.addEventListener("click", clearLocalStorage);
startGame.addEventListener("click", goToQuestions);
// testButton.addEventListener("click", goToEnd);
viewHS.addEventListener("click", goToHS);



