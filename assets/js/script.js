// Global Variable definitions
var topRowContainer = document.querySelector(".top-row-container");
var headingIntroContainer = document.querySelector(".heading-intro-container");
var questionAnswerContainer = document.querySelector(".question-answer-container");
var resultsContainer = document.querySelector(".results-container");
var highscoresContainer = document.querySelector(".highscores-container");
var highScoresListContainer = document.querySelector(".highscores-list");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var highScoresButton = document.querySelector(".view-highscores");
var questionEl = document.querySelector(".question");
var answerChoicesContainer = document.querySelector(".answer-choices");
var answerChoiceAEl = document.getElementById("answer-choice-a");
var answerChoiceBEl = document.getElementById("answer-choice-b");
var answerChoiceCEl = document.getElementById("answer-choice-c");
var answerChoiceDEl = document.getElementById("answer-choice-d");
var finalScoreElement = document.querySelector(".final-score");
var userInitialsElement = document.getElementById("initials")
var submitInitialsButton = document.querySelector(".submit-initials-button");
var goBackButton = document.querySelector(".go-back-button");



var timer;
var timerCount;
var selectedAnswer;
var currentQuestion = 0;
//var userInitials;
//var leaderboard = [];


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
startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", viewRenderHighscores);
    // Moved to the global variable and outside of a function to prevent eventListeners from being added each playthrough
answerChoiceAEl.addEventListener("click", function(){selectedAnswer = "a"; checkResponse()});
answerChoiceBEl.addEventListener("click", function(){selectedAnswer = "b"; checkResponse()});
answerChoiceCEl.addEventListener("click", function(){selectedAnswer = "c"; checkResponse()});
answerChoiceDEl.addEventListener("click", function(){selectedAnswer = "d"; checkResponse()});
    // submitInitials Button
submitInitialsButton.addEventListener("click", recordInitials); // Added recordInitials as a callback because as a function it immediately launched before an individual submitted 
goBackButton.addEventListener("click", goBack)

// Function definitions
function init () {
    questionAnswerContainer.setAttribute("style", "display: none;");
    resultsContainer.setAttribute("style", "display: none;");
    highscoresContainer.setAttribute("style", "display: none;");
}

function startGame () {
    headingIntroContainer.setAttribute("style", "display:none;")
    questionAnswerContainer.removeAttribute("style", "display: none;");
    // ADD: DISABLE THE VIEW HIGHSCORES BUTTON TO PREVENT A MISMATCH OF DISPLAY:NONES highScoresButton.disabled = true; 
    timerCount = 60;
    
    // FOR REPLAY PURPOSES AFTER COMPLETING ONE ROUND
    currentQuestion = 0; // Added because without it the question count exceeds the switch statement so the game ends immediately
    
    renderQuestions();
    startTimer();
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
            endGame();

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

function startTimer () {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;
        if ((currentQuestion === questionBank.length) && timerCount > 0) { // Set currentQuestion === length due to zero-based numbering. If the condition is currentQuestion > length, won't function as intended because currentQuestion makes at 4, not 5
            clearInterval(timer);
            timerElement.textContent = "Time: " + timerCount;
            endGame();
        }
        

        if (timerCount <= 0) {
            clearInterval(timer);
            if (timerCount < 0) { // Can receive a negative score if a question is answered incorrectly with fewer than 10 seconds remaining. When this happens, set timerCount = 0
                timerCount = 0;
            }
            timerElement.textContent = "Time: " + timerCount;
            endGame();
        }
    }, 1000);
}


function checkResponse() {
    console.log(selectedAnswer)
    if (selectedAnswer === questionBank[currentQuestion]["correctAnswer"]) {
        // answer-choice-[selectedAnswer].setAttribute("style", "background-color: green;")
        // window.alert("Correct")
        currentQuestion++;
        renderQuestions();
        
    }
    else {
        currentQuestion++;
        renderQuestions();
        // subtract 10 seconds from time
        // Add red background-color styling to selected answer
        timerCount = timerCount - 10; 
        timerElement.textContent = "Time: " + timerCount; // Added to immediately apply 10 second penalty to the webpage's timer
        // window.alert("Incorrect. time left: " + timerCount);
        
    }
}

function endGame () {
    questionAnswerContainer.setAttribute("style", "display: none;");
    resultsContainer.removeAttribute("style", "display: none;");
    finalScoreElement.textContent = "Your final score is " + timerCount + ".";
}

function recordInitials (event) { // Added for callback
    event.preventDefault(); // Added preventDefault to stop the form from refreshing to init()
    userInitials = userInitialsElement.value
    userInitials = userInitials.toUpperCase();

    /*var currentUserInfoObject = function (userInitials, timerCount) {
        var tempObject = {initials: userInitials,
        score: timerCount}
        return tempObject
    } */
    
    var currentUserInfoObject = {
        initials: userInitials,
        score: timerCount}

    
    // Check if a list for locally stored leaderboards exist. If not, create a an empty string object, else retrieve
    if (localStorage.getItem("leaderboardArray") === null) {
        localStorage.setItem("leaderboardArray", JSON.stringify([]));
    }
    // Retrieve locally stored leaderboard and append new userInfo to it
    var currentLeaderboard = JSON.parse(localStorage.getItem("leaderboardArray")); // Retrieve and convert string back to an array
    currentLeaderboard.push(currentUserInfoObject); // Append the latest currentUserInfo object object 
    currentLeaderboard = currentLeaderboard.sort(function(a, b){return b.score - a.score}); // This was detailed in the W3 schools JS Array Sort page
    // Save array turned in to a JavaScript object string
    localStorage.setItem("leaderboardArray", JSON.stringify(currentLeaderboard));

    viewRenderHighscores();
}

function viewRenderHighscores () {
    clearInterval(timer); // Added here because if a user selected "View Highscores" while the game was running and then selected "Go back", the timer would continue to run because the clearInterval conditions were not fulfilled"
    // Ensure only relevant sections are displayed
    if (topRowContainer.hasAttribute("style", "display: none;") === false) {
        topRowContainer.setAttribute("style", "display: none;");
    }
    if (headingIntroContainer.hasAttribute("style", "display: none;") === false) {
        headingIntroContainer.setAttribute("style", "display: none;");
    }
    if (questionAnswerContainer.hasAttribute("style", "display: none;") === false) {
        questionAnswerContainer.setAttribute("style", "display: none;");
    }
    if (resultsContainer.hasAttribute("style", "display: none;") === false) {
        resultsContainer.setAttribute("style", "display: none;");
    }
    if (highscoresContainer.hasAttribute("style", "display: none;")) {
        highscoresContainer.removeAttribute("style", "display: none;");
    }



    // Create list element and append
    // Due to utilizing append, whenever viewRenderHighscores () is called, it'll add the list elements again so we will conclude with duplicated list
    // Local storage is unaffected, but the user is presented incorrect information
    // To remedy, I will delete all child elements from the highScoresListContainer each time the function is invoked
    // and have it compile the list elements from scratch each time
    while (highScoresListContainer.hasChildNodes()) {
        highScoresListContainer.removeChild(highScoresListContainer.firstChild) // As long as the list container has child elements, it will delete the first. This repeats until the list container doesn't have any child elements
    }

    var currentLeaderboard = JSON.parse(localStorage.getItem("leaderboardArray"));
    for (var i = 0; i < currentLeaderboard.length; i++) {
        var rowInitials = currentLeaderboard[i]["initials"];
        var rowScore = currentLeaderboard[i]["score"];

        var rowListElement = document.createElement("li");
        rowListElement.textContent = rowInitials + ": " + rowScore
        if (i % 2 === 0) {
            rowListElement.setAttribute("style", "background-color: var(--light-purple-background-color);")
        }
        highScoresListContainer.appendChild(rowListElement)
    }
}

function goBack () {
    if (topRowContainer.hasAttribute("style", "display: none;")) {
        topRowContainer.removeAttribute("style", "display: none;");
    }
    if (headingIntroContainer.hasAttribute("style", "display: none;")) {
        headingIntroContainer.removeAttribute("style", "display: none;");
    }
    resultsContainer.setAttribute("style", "display: none;");
    highscoresContainer.setAttribute("style", "display: none;");

    init();
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

