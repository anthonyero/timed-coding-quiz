// Global Variable definitions
var headingIntroContainer = document.querySelector(".heading-intro-container");
var questionAnswerContainer = document.querySelector(".question-answer-container");
var resultsContainer = document.querySelector(".results-container");
var highscoresContainer = document.querySelector(".highscores-container");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var highScores

var isCorrect = false;
var timer;
var timerCount;

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

// Function definitions
function init () {
    questionAnswerContainer.setAttribute("style", "display: none;");
    resultsContainer.setAttribute("style", "display: none;");
    highscoresContainer.setAttribute("style", "display: none");
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