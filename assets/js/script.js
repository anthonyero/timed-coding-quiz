// Global Variable definitions
var headingIntroContainer = document.querySelector(".heading-intro-container");
var questionAnswerContainer = document.querySelector(".question-answer-container");
var resultsContainer = document.querySelector(".results-container");
var highscoresContainer = document.querySelector(".highscores-container");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var highScoresButton = document.querySelector(".view-highscores");
var questionEl = document.querySelector(".question");
var answerChoicesContainer = document.querySelector(".answer-choices");
var answerChoiceAEl = document.getElementById("answer-choice-a");
var answerChoiceBEl = document.getElementById("answer-choice-b");
var answerChoiceCEl = document.getElementById("answer-choice-c");
var answerChoiceDEl = document.getElementById("answer-choice-d");



var isCorrect = false;
var timer;
var timerCount;
var selectedAnswer;
var currentQuestion = 0;

var timerTest = 60 //FOR TESTING PURPOSES 


    // Question Bank: An array of question objects

const questionBank = [ 
    {
        question: "Commonly used data types DO NOT include:",
        answerChoices: {
            a: "strings",
            b: "booleans",
            c: "alerts",
            d: "numbers"
        },
        correctAnswer: "c" // Explore functionality to assign radio button value of answer choice to code `correctAnswer` with a value rather than a letter. More opportunities for randomization.
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answerChoices: {
            a: "quotes",
            b: "curly brackets",
            c: "parentheses",
            d: "square brackets"
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store ____",
        answerChoices: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answerChoices: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parentheses"
        },
        correctAnswer: "c"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerChoices: {
            a: "JavaScript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log"
        },
        correctAnswer: "d"
    }
]

// Button eventListeners
startButton.addEventListener("click", startGame)
    // Moved to the global variable and outside of a function to prevent eventListeners from being added each playthrough
answerChoiceAEl.addEventListener("click", function(){selectedAnswer = "a"; checkResponse()});
answerChoiceBEl.addEventListener("click", function(){selectedAnswer = "b"; checkResponse()});
answerChoiceCEl.addEventListener("click", function(){selectedAnswer = "c"; checkResponse()});
answerChoiceDEl.addEventListener("click", function(){selectedAnswer = "d"; checkResponse()});
    


// Function definitions
function init () {
    questionAnswerContainer.setAttribute("style", "display: none;");
    resultsContainer.setAttribute("style", "display: none;");
    highscoresContainer.setAttribute("style", "display: none");
}

function startGame () {
    headingIntroContainer.setAttribute("style", "display:none;")
    questionAnswerContainer.removeAttribute("style", "display: none;");
    // ADD: DISABLE THE VIEW HIGHSCORES BUTTON TO PREVENT A MISMATCH OF DISPLAY:NONES highScoresButton.disabled = true; 
    
    renderQuestions();
    // startTimer();
}

function renderQuestions () {
    // ADD: A LOOP OR OTHER WAY TO ITERATE OVER THE LENGTH OF THE questionBank array
    // ADD a condition that time > 0 otherwise exit this function and run a gameEnd() function
    switch(currentQuestion) {
        case 0: 
            writeInsertQuestions(0);
            break;
        case 1:
            writeInsertQuestions(1);
            break;
        case 2:
            writeInsertQuestions(2);
            break;
        case 3:
            writeInsertQuestions(3);
            break;
        case 4:
            writeInsertQuestions(4);
            break;
        default:
            window.alert("Those were all of the questions!")
            // call gameEnd function



    }

    function writeInsertQuestions (currentQuestion) {
        questionEl.textContent = questionBank[currentQuestion]["question"];
        answerChoiceAEl.textContent = questionBank[currentQuestion]["answerChoices"]["a"]; // Struggled using querySelector and class. Changed to ID and worked 
        answerChoiceBEl.textContent = questionBank[currentQuestion]["answerChoices"]["b"];
        answerChoiceCEl.textContent = questionBank[currentQuestion]["answerChoices"]["c"];
        answerChoiceDEl.textContent = questionBank[currentQuestion]["answerChoices"]["d"];
    }

    /* This loop would immediately iterate through all of the questions without awaiting a user's response. Remedied by using the Switch statement above*/
    /*for (var i = 0; i < questionBank.length; i++) {
        questionEl.textContent = questionBank[i]["question"];
        answerChoiceAEl.textContent = questionBank[i]["answerChoices"]["a"]; // Struggled using querySelector and class. Changed to ID and worked 
        answerChoiceAEl.addEventListener("click", function(){selectedAnswer = "a"; checkResponse()});
        answerChoiceBEl.textContent = questionBank[i]["answerChoices"]["b"];
        answerChoiceBEl.addEventListener("click", function(){selectedAnswer = "b"; checkResponse()});
        answerChoiceCEl.textContent = questionBank[i]["answerChoices"]["c"];
        answerChoiceCEl.addEventListener("click", function(){selectedAnswer = "c"; checkResponse()});
        answerChoiceDEl.textContent = questionBank[i]["answerChoices"]["d"];
        answerChoiceDEl.addEventListener("click", function(){selectedAnswer = "d"; checkResponse()});
    }*/
    
    
}



function checkResponse() {
    console.log(selectedAnswer)
    if (selectedAnswer === questionBank[currentQuestion]["correctAnswer"]) {
        // answer-choice-[selectedAnswer].setAttribute("style", "background-color: green;")
        window.alert("Correct")
        currentQuestion++;
        renderQuestions();
        
    }
    else {
        // subtract 10 seconds from time
        // Add red background-color styling to selected answer
        timerTest = timerTest - 10; // BUG when selecting answer for questions 2-5 receive multiple inputs causing score to deplete rapidly
                                    // It may be registering multiple clicks? A clue is that sometimes it will 
                                    // give multiple alerts. Some "correct" then "incorrect" after the same button press
        window.alert("Incorrect. time left: " + timerTest);
        currentQuestion++;
        renderQuestions();
    }
}


init();


/* Psuedocoding the order of events for 
1. User accesses webpage
    - Presented a screen with the "View Highscores" link, "Time",  the heading, description, and the "Start Quiz" button
2. User selects "Start Quiz"
    - Hide "heading-intro-container"
    - User will be presented with a screen containing the current question (display question-answer-container)
    - Timer will start
    - Responses will presented as buttons or eventListener
    - User will select a choice which will initiate a `checkResponse` function
        - If correct, 
            - Provide visual confirmation of a correct response: perhaps change the background-color to green
            - Advance to the next item in questionBank array
        - If incorrect,
            - Provide visual confirmation of an incorrect response
            - Subtract 10 seconds from timer
            - Advance to the next item in questionBank array
3. When all questions have been answered OR time === 0
    - Stop the timer, and log the timer value for a score
        - if time === 0
            - Debate functionality of allowing score to be recorded
            - Could take the user to the highscores-container and allow 
        - else
            - present the results-container with a form that allows users to submit their score to the leaderboard
*/