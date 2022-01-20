//VARIABLES
var HSidCounter = 0;
var indexNumber = 0;
var timeLeft = 80;
var playerScore = [];
var HSarray = [];
var timerEl = document.getElementById("countdown");
var entireQuestionEl = document.getElementById("question-content-wrapper");
var scoreListEl = document.getElementById("scores");
var chooseOptionEl = document.querySelector(".choose-option-wrapper");
var rightOptionEl = document.querySelector(".right-option-wrapper");
var wrongOptionEl = document.querySelector(".wrong-option-wrapper");
//pages
var beginScreenEl = document.getElementById("begin-screen");
var questionScreenEl = document.getElementById("question-screen");
var timeOutScreenEl = document.getElementById("time-out");
var endScreenEl = document.getElementById("end-screen");
var questionsFinishedEl = document.getElementById("questions-answered");
var HSScreenEl = document.getElementById("high-score-wrapper");
//buttons
var startGameBtn = document.getElementById("start-game");
var viewHSBtn = document.getElementById("view-hs");
var clearStorageBtn = document.getElementById("clear-scores");
var nextQuestionBtn = document.getElementById("next-question");
var toResultsBtn = document.getElementById("view-result");
var submitScoreBtn = document.getElementById("submit-hs");
var backToStartBtn = document.getElementById("back-to-start");
//question array
var questions = [
  {
    question: "1. What is NOT a type of JavaScript variable?",
    answers: [" String", " Words", " BigInt", " Number"],
    correctAnswer: " Words",
  },
  {
    question: "2. String values must be enclosed within ______ when being assigned to variables.",
    answers: [" Quotes", " Commas", " Curly brackets", " Parenthesis"],
    correctAnswer: " Quotes",
  },
  {
    question: "3. How would you write 'Hello World' in a window alert?",
    answers: [
      " message('Hello World');",
      " alert(Hello World);",
      " alert('Hello World');",
      " windowalert('Hello World');",
    ],
    correctAnswer: " alert('Hello World');",
  },
  {
    question: "4. How do you add a comment in JavaScript?",
    answers: [
      " *This is a comment",
      " //This is a comment",
      " 'This is a comment'",
      " *This is a comment",
    ],
    correctAnswer: " //This is a comment",
  },
  {
    question: "5. What is the correct way to write a JavaScript array?",
    answers: [
      " var days = [Monday, Tuesday, Wednesday]",
      " var days = ['Monday' 'Tuesday' 'Wednesday']",
      " var days = {'Monday', 'Tuesday', 'Wednesday'}",
      " var days = ['Monday', 'Tuesday', 'Wednesday']",
    ],
    correctAnswer: " var days = ['Monday', 'Tuesday', 'Wednesday']",
  },
  {
    question: "6. How is a JavaScript variable declared?",
    answers: [
      " var variableName",
      " variable variableName",
      " v variableName",
      " declareVariable variableName",
    ],
    correctAnswer: " var variableName",
  },
  {
    question: "7. What operator is used to assign a value to a variable?",
    answers: [" +", " =", " -", " =="],
    correctAnswer: " =",
  },
  {
    question: "8. How do you call a function named randomFunction?",
    answers: [
      " call randomFunction()",
      " function randomFunction()",
      " randomFunction()",
      " !randomFunction()",
    ],
    correctAnswer: " randomFunction()",
  },
  {
    question: "9. How do you get the DOM element with id in JavaScript?",
    answers: [
      " window.getElementById(...)",
      " document.getId(...)",
      " getElementById(...)",
      " document.getElementById(...)",
    ],
    correctAnswer: " document.getElementById(...)",
  },
  {
    question: "10. Arrays in JavaScript can be used to store...",
    answers: [
      " Other arrays",
      " Numbers and Strings",
      " Objects",
      " All of the above",
    ],
    correctAnswer: " All of the above",
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
    beginScreenEl.style.display = "none";
    questionScreenEl.style.display = "flex";

    
    rightOptionEl.style.display = "none";
    wrongOptionEl.style.display = "none";

    createQuestion();
    startTimer();
};

//FROM START SCREEN TO HIGH SCORE SCREEN
var goToHS = function () {
    HSScreenEl.style.display = "block";
    beginScreenEl.style.display = "none";
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
        };

        if (indexNumber > questions.length - 1) {
          clearInterval(timeInterval);
        };

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
        var displayQuestionEl = document.createElement("h1");
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

        gameQuestionsWrapper.appendChild(answerList);
        entireQuestionEl.appendChild(gameQuestionsWrapper);

        // //create list items to contain answers and push them to the screen
        for (var i = 0; i < currentQuestion.answers.length; i++) {
            var listItem = document.createElement("li");

            var radioButton = document.createElement("INPUT");
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("class", "radio-button");
            radioButton.setAttribute("id", "answer-" + i);
            radioButton.setAttribute("name", "answer");
            radioButton.setAttribute("value", currentQuestion.answers[i]);

            var radioLabel = document.createElement("LABEL");
            radioLabel.setAttribute("for", "answer-" + i);
            radioLabel.setAttribute("class", "radio-label");
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
    };
    
    if (timeLeft > 0) {
        reset();
        createQuestion();
    };
};

//CHECKS IF ANSWER IS RIGHT OR WRONG
var checkAnswer = function () {
    var currentQuestion = questions[indexNumber];
    var currentCorrectAnswer = currentQuestion.correctAnswer;
    var answers = document.getElementsByName("answer");
    let correctOption = null;

    //GETS CORRECT ANSWER FROM ARRAY
    answers.forEach((answer) => {
        if (answer.value === currentCorrectAnswer) {
            correctOption = answer.labels[0].id;
        };
    });

    //IF NOTHING IS SELECTED
    if (answers[0].checked == false && answers[1].checked == false && answers[2].checked == false && answers[3].checked == false) {
        chooseOptionEl.style.display = "flex";
    };

    //RIGHT OR WRONG
    answers.forEach((answer) => {
        if (answer.checked === true && answer.value === currentCorrectAnswer) {
            indexNumber++;
            chooseOptionEl.style.display = "none";
            rightOptionEl.style.display = "flex";
            wrongOptionEl.style.display = "none";
        } else if (answer.checked && answer.value !== currentCorrectAnswer) {
            timeLeft -= 10;
            indexNumber++;
            chooseOptionEl.style.display = "none";
            wrongOptionEl.style.display = "flex";
            rightOptionEl.style.display = "none";
        };
    });
};

//PUSH SCORE TO SCREEN
var sendScore = function (scoreObj) {
    var score = timeLeft;

    var scoreLog = document.getElementById("score");
    scoreLog.textContent = "Score: " + score;

    scoreObj = score;

    playerScore.push(scoreObj);
};

//CREATE HIGH SCORE
var createHS = function (highScoreObj) {
    var HSItemEl = document.createElement("li");
    HSItemEl.setAttribute("data-hs-id", HSidCounter);
    HSItemEl.className = "hs-li";
    HSItemEl.textContent = highScoreObj.initials + "............" + highScoreObj.score;
    scoreListEl.appendChild(HSItemEl);

    highScoreObj.id = HSidCounter;

    HSarray.push(highScoreObj);

    saveHighScore();

    HSidCounter++;
};

//SAVE HS TO LOCAL STORAGE
var saveHighScore = function () {
  localStorage.setItem("HS submit", JSON.stringify(HSarray));
};

//LOAD HIGH SCORES FOR PERSISTANCE 
var loadHighScore = function () {
    savedHSarray = localStorage.getItem("HS submit");

    if (!savedHSarray) {
        return false;
    };

    savedHSarray = JSON.parse(savedHSarray);

    //SORTS HS LIST FROM HIGHEST TO LOWEST
    savedHSarray.sort(function (a, b) {
      return b.score - a.score;
    });

    //PUSHES SAVED ARRAY THROUGH CREATEHS()
    for (var i = 0; i < savedHSarray.length; i++) {
        createHS(savedHSarray[i]);
    };  
};

//TO BEGINNING SCREEN
var toStart = function () {
    beginScreenEl.style.display = "block";
    endScreenEl.style.display = "none";
    indexNumber = 0;
    playerScore = [];
};

//RESET TIME LEFT FOR NEW GAME
var resetTimeLeft = function () {
    timeLeft = 80;
};


//EVENT LISTENERS
clearStorageBtn.addEventListener("click", clearLocalStorage);
startGameBtn.addEventListener("click", goToQuestions);
viewHSBtn.addEventListener("click", goToHS);
nextQuestionBtn.addEventListener("click", handleNextQuestion);
toResultsBtn.addEventListener("click", goToResults);
submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var initialInput = document.querySelector("input[name='initials']").value;

    var highScoreObj = {
      score: playerScore,
      initials: initialInput,
    };

    if (initialInput == "" || initialInput == null) {
        alert("Please Enter Your name!");
    } else {
        createHS(highScoreObj);

        document.querySelector("input[name='initials']").value = "";

        alert("Thank You for Playing!");
        location.reload();
    };
});
startGameBtn.addEventListener("click", resetTimeLeft);
backToStartBtn.addEventListener("click", toStart);

loadHighScore();