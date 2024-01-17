# Timed Coding Quiz

## Description

To help familiarize myself with coding assessments, I have programmed a webpage with a timed coding quiz that presents multiple-choice questions to the user, records their score, and presents a leaderboard to the user based on previous attempts. 

**Features include**:

- A set of screens that dynamically populate questions from a question bank coded in the `script.js` file. 
    - Questions are stored in an array and each question is an object with the question text, answer choices, and the correct answer. 
- When the quiz is started, a visible 60-second timer begins to count down. 
    - If a user answers a question incorrectly, a 10-second penalty is applied to the timer count. The timer reflects this penalty immediately as it is incurred.
- When all questions are answered or the timer counts down to 0, the quiz concludes and the user is presented to a page where they can view their results and submit their initials with their score. The score is the time left when the quiz is concluded.
- A user's initials and their score are saved to local storage. Multiple entries can be stored.
- Stored user initials and scores are sorted and can be viewed on the Highscores page. Alternating rows have different background-styling. 
- Users can clear local storage of their existing results.
- When a user hovers over a button or answer choice, the element receives an increase in brightness providing a visual cue of their cursor's position. 
- A responsive layout that adapts to a viewer's viewport.
- Media queries for mobile devices such as phones and for small tablets.


This exercise was provided by Northwestern University and edX through the Coding boot camp. Submitted as fulfillment of the Module 04 exercise during the December, 2023 - June, 2024 cohort.

## Installation

N/A

## Usage

The webpage has been published through GitHub pages and this project's files can be accessed through the following links:

- [Link to the published GitHub Page](https://anthonyero.github.io/timed-coding-quiz/)

- [Link to the GitHub repository](https://github.com/anthonyero/timed-coding-quiz)

Relevant images, HTML file, CSS stylesheet, and JavaScript script file are included within the repository. The images, stylesheet, and script are contained in the "assets" folder.

The HTML, CSS, and JS files include comments detailing changes implemented within them. Further justifications can also be found within the repository's "Issues" tab.

Please refer to the commit history and branches within the repository for a tracked history of changes.

## Credits

 Initial code was not provided for this exercise and thus I wrote the HTML, CSS, and JavaScript files myself. 

# License

N/A

![Screenshot of the live portfolio webpage 1-16-24](/assets/images/live-timed-coding-quiz-webpage.png)