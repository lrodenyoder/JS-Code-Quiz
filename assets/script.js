//PAGES THAT NEED JS: QUESTIONS, END, HS (ONLY CLEAR LOCAL STORAGE)
//VARIABLES
var timerEl = document.getElementById("countdown");
var entireQuestionEl = document.getElementById("question-content-wrapper");
var answerOne = document.getElementById("answer-one");
var timeLeft = 50;
var playerScore = [];
var HSidCounter = 0;
var scoreListEl = document.getElementById("scores");
var HSarray = [];

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
var nextQuestion = document.getElementById("next-question");
var toResults = document.getElementById("view-result");
var submitScore = document.getElementById("submit-hs");
var backToStart = document.getElementById("back-to-start");


var indexNumber = 0;

var questions = [
  {
    question: "choose first answer",
    answers: ["choose me", "wrong", "wrong", "wrong"],
    correctAnswer: "choose me",
  },
  {
    question: "choose second answer",
    answers: ["wrong", "choose me2", "wrong", "wrong"],
    correctAnswer: "choose me2",
  },
];



//FUNCTIONS
//CLEAR LOCAL STORAGE
var clearLocalStorage = function () {
    localStorage.clear();
    location.reload();
};

//RESET HTML FOR NEW QUESTIONS
var reset = function () {
    var deleteQuestion = document.getElementById("game-questions-wrapper");
    deleteQuestion.remove();

    var deleteAnswers = document.getElementById("answerList");
    deleteAnswers.remove();
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
    
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            timerEl.textContent = timeLeft;

            timeLeft--;
        } else {
            timerEl.textContent = 0;

            clearInterval(timeInterval);

            timeOut();
        }

        if (indexNumber > questions.length - 1) {
          clearInterval(timeInterval);
        }

    }, 1000);
};

//GO TO TIME OUT PAGE WHEN TIMER = 0
var timeOut = function () {
        questionScreenEl.style.display = "none";
        timeOutScreenEl.style.display = "flex";
};

//GET QUESTION/ANSWERS FROM QUESTIONS ARRAY AND PUSH TO SCREEN
var createQuestion = function () {
    var currentQuestion = questions[indexNumber];

        //create div for question
        var questionWrapper = document.createElement("div");
        questionWrapper.setAttribute("id", "game-questions-wrapper");

        //create <h1>
        var displayQuestionEl = document.createElement("h1")
        displayQuestionEl.setAttribute("id", "display-question");

        //push current question to <h1></h1>
        displayQuestionEl.setAttribute("question", currentQuestion.question);
        displayQuestionEl.textContent = currentQuestion.question;

        questionWrapper.appendChild(displayQuestionEl);
        entireQuestionEl.appendChild(questionWrapper);
    

        // //create list as container for answers
        var gameQuestionsWrapper = document.createElement("div");
        gameQuestionsWrapper.setAttribute("id", "gameQuestionsWrapper");

        var answerList = document.createElement("ul");
        answerList.setAttribute("id", "answerList");

        gameQuestionsWrapper.appendChild(answerList)
        entireQuestionEl.appendChild(gameQuestionsWrapper);

        // //create list items to contain answers and push them to the screen
        for (var i = 0; i < currentQuestion.answers.length; i++) {
            var listItem = document.createElement("li");

            var radioButton = document.createElement("INPUT");
            radioButton.setAttribute("type", "radio")
            radioButton.setAttribute("class", "radio-button")
            radioButton.setAttribute("id", "answer-" + i);
            radioButton.setAttribute("name", "answer");
            radioButton.setAttribute("value", currentQuestion.answers[i]);

            var radioLabel = document.createElement("LABEL");
            radioLabel.setAttribute("for", "answer-" + i);
            radioLabel.setAttribute("class", "radio-label")
            radioLabel.setAttribute("id", "answer-" + i + "-label");
            radioLabel.setAttribute("value", currentQuestion.answers[i]);
            radioLabel.innerHTML = currentQuestion.answers[i];
       
        
            listItem.appendChild(radioButton);
            listItem.appendChild(radioLabel);
            answerList.appendChild(listItem);  
        }
};

//SETS UP NEXT QUESTION
var handleNextQuestion = function () {  
    checkAnswer();
    
    if (indexNumber > questions.length - 1) {
        goToEnd();
    }
    
    if (timeLeft > 0) {
        reset();
        createQuestion();
    }
};

//CHECKS IF ANSWER IS RIGHT OR WRONG
var checkAnswer = function () {
  
    var currentQuestion = questions[indexNumber];
    var currentCorrectAnswer = currentQuestion.correctAnswer;
    var answers = document.getElementsByName("answer")
    let correctOption = null;

    console.log(currentCorrectAnswer);

    //GETS CORRECT ANSWER FROM ARRAY
    answers.forEach((answer) => {
        if (answer.value === currentCorrectAnswer) {
            correctOption = answer.labels[0].id /*how tf does this work*/
        }
    })

    //IF NOTHING IS SELECTED. NEED TO FIX
    if (answers[0].checked === false && answers[1] === false && answers[2] === false && answers[3] === false) {
        window.alert("choose an option")
    }

    //RIGHT OR WRONG
    answers.forEach((answer) => {
        if (answer.checked === true && answer.value === currentCorrectAnswer) {
            console.log("correct")
            indexNumber++;
        } else if (answer.checked && answer.value !== currentCorrectAnswer) {
            console.log("wrong")
            timeLeft -= 5;
            indexNumber++;
        }
    })
};

//FROM ALL QUESTIONS ANSWERED SCREEN TO END SCREEN
var goToEnd = function () {
    
    questionScreenEl.style.display = "none";
    questionsFinishedEl.style.display = "flex";
    
    sendScore();
};

//FROM END SCREEN TO RESULTS SCREEN
var goToResults = function () {
    questionsFinishedEl.style.display = "none";
    endScreenEl.style.display = "flex";
};

//PUSH SCORE TO SCREEN
var sendScore = function (scoreObj) {
    var score = timeLeft;

    var scoreLog = document.getElementById("score");
    scoreLog.textContent = "Score: " + score;

    scoreObj = score;

    playerScore.push(scoreObj);

    console.log(score);
};



//SUBMIT HIGH SCORE
var createHS = function (highScoreObj) {
    // event.preventDefault();
    //var playerInitials = document.querySelector("input[name='initials']").value;

    //document.querySelector("input[name='initials']").value = "";

    // var highScoreObj = {
    //     score: playerScore,
    //     initials: playerInitials,
    //     id: HSidCounter
    // };

    // console.log(playerInitials);

    // localStorage.setItem("HS submit", JSON.stringify(highScoreObj));

    // HSidCounter++;

    // indexNumber = 0;
    //location.reload();
    //toStart();

        var taskItemEl = document.createElement("li");
    taskItemEl.setAttribute("data-hs-id", HSidCounter);
    taskItemEl.className = "high-score";
        taskItemEl.textContent = highScoreObj.score;
        scoreListEl.appendChild(taskItemEl);

    highScoreObj.id = HSidCounter;

    HSarray.push(highScoreObj);

    saveHighScore();

    HSidCounter++;
};

var saveHighScore = function () {
  localStorage.setItem("HS submit", JSON.stringify(HSarray));
};

var loadHighScore = function () {
    savedHSarray = localStorage.getItem("HS submit");

    if (!savedHSarray) {
        return false;
    }

    savedHSarray = JSON.parse(savedHSarray);

    for (var i = 0; i < savedHSarray.length; i++) {
        createHS(savedHSarray[i]);
    }
}

var toStart = function () {
    beginScreenEl.style.display = "block";
    endScreenEl.style.display = "none";
    indexNumber = 0;
};

// var loadScores = function () {
//     var savedScores = localStorage.getItem("HS submit");

//     if (!savedScores) {
//         return false;
//     }

//     savedScores = JSON.parse(savedScores);

//     //loop through savedScores array to create high scores
// };

// var createHighScores = function () {
//     var HSli = document.createElement("li");
//     HSli.className = "HS-item";
//     HSli.setAttribute("data-hs-id", HSidCounter)
// };

var resetTimeLeft = function () {
    timeLeft = 50;
};



//EVENT LISTENERS
clearStorage.addEventListener("click", clearLocalStorage);
startGame.addEventListener("click", goToQuestions);
viewHS.addEventListener("click", goToHS);
nextQuestion.addEventListener("click", handleNextQuestion);
toResults.addEventListener("click", goToResults);
submitScore.addEventListener("click", function (event) {
    event.preventDefault();

    var initialInput = document.querySelector("input[name='initials']").value;

    var highScoreObj = {
      score: playerScore,
      initials: initialInput,
    };

    createHS(highScoreObj);
});
startGame.addEventListener("click", resetTimeLeft)
backToStart.addEventListener("click", toStart);

loadHighScore();

//TO FIX: 1. CREATEQUESTION() RUNNING AFTER ALL QUESTIONS ANSWERED. 2.HSidCounter resets on page refresh. 3. CREATE HIGHSCORE LIST


