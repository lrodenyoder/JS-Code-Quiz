//PAGES THAT NEED JS: QUESTIONS, END, HS (ONLY CLEAR LOCAL STORAGE)
//VARIABLES
var timerEl = document.getElementById("countdown");
var mainEl = document.getElementById("question-content-wrapper");
var displayQuestionEl = document.getElementById("display-question");
var answerOne = document.getElementById("answer-one");
//pages
var beginScreenEl = document.getElementById("begin-screen");
var questionScreenEl = document.getElementById("question-screen");
var timeOutScreenEl = document.getElementById("time-out");
var endScreenEl = document.getElementById("end-screen");
var questionsFinishedEl = document.getElementById("questions-answered");
var HSScreenEl = document.getElementById("high-score");
//buttons
var startGame = document.getElementById("start-game");
var viewHS = document.getElementById("view-hs");
var clearStorage = document.getElementById("clear-scores");
// var testButton = document.getElementById("answer-one");

var questions = [
  {
    question: "choose first answer",
    answers: ["choose me", "wrong", "wrong", "wrong"],
    correctAnswer: "choose me",
  },
  {
    question: "choose second answer",
    answers: ["wrong", "choose me", "wrong", "wrong"],
    correctAnswer: "choose me",
  },
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

    createQuestion();
    startTimer();
};

//FROM START SCREEN TO HIGH SCORE SCREEN
var goToHS = function () {
    HSScreenEl.style.display = "block";
    beginScreenEl.style.display = "none";
};

//START COUNTDOWN WHEN QUESTION SCREEN IS LOADED
var startTimer = function () {
    var timeLeft = 50;

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

// var handleQuestions = function () {
//     if (questions.length === 0) {
//         questionEndScreen(); //pop up end of questions page
//         return;
//     }

//     for (var i = 0; i < questions.answers.length; i++) {
//         //push questions as long as the array has questions left
//     }


// };

//GET QUESTION/ANSWERS FROM QUESTIONS ARRAY AND PUSH TO SCREEN
var createQuestion = function () {
    var currentQuestion = questions.pop();

    //push current question to <h1></h1>
    displayQuestionEl.setAttribute("question", currentQuestion.question);
    displayQuestionEl.textContent = currentQuestion.question;
    

    


    // //create list as container for answers
    var answerList = document.createElement("ul");
    answerList.setAttribute("id", "choiceBox");
    mainEl.appendChild(answerList);

    // //create list items to contain answers and push them to the screen
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var listItem = document.createElement("li");

        var radioButton = document.createElement("INPUT");
        radioButton.setAttribute("type", "radio")
        radioButton.setAttribute("id", "answer-" + i);
        radioButton.setAttribute("name", "answer-" + i);

        var radioLabel = document.createElement("LABEL");
        radioLabel.setAttribute("for", "answer-" + i);
        radioLabel.setAttribute("id", "answer-" + i + "-label");
        radioLabel.setAttribute("answer-value", currentQuestion.answers[i]);
       
        radioLabel.innerHTML = currentQuestion.answers[i];
       
        
        listItem.appendChild(radioButton);
        listItem.appendChild(radioLabel);
        answerList.appendChild(listItem);
    }

    answerList.addEventListener("click", function () {
        checkAnswer(currentQuestion);
    });
};

var checkAnswer = function (event) {
    debugger;
    // var x = event.currentTarget;
    // console.log(x);

    console.log(event.currentTarget);

    if (x.match(".li")) {
        var selectedAnswer = x.textContent;

        if (selectedAnswer === curQuest.CorrectAnswer) {
            createQuestion();
        } else {
            timerEl -= 5;
        }
    }

    createQuestion();
};

//FROM ALL QUESTIONS ANSWERED SCREEN TO END SCREEN (change to be from all answers to end screen)
// var goToEnd = function () {
//     if (questionScreenEl.style.display === "none") {
//         questionScreenEl.style.display = "flex";
//         questionsAnsweredEl.style.display = "none"
//     } else {
//         questionScreenEl.style.display = "none";
//         questionsAnswered.style.display = "flex";
//     }
// };










//EVENT LISTENERS
clearStorage.addEventListener("click", clearLocalStorage);
startGame.addEventListener("click", goToQuestions);
// testButton.addEventListener("click", goToEnd);
viewHS.addEventListener("click", goToHS);



