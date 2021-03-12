var timeLeft = document.querySelector(".timer");
var startButton = document.querySelector(".strtbtn");
var viewScores = document.querySelector(".viewscores");
var currentQuestion;
var score = 0;
var secondsLeft = 30;
var questNum = 0;
var questScreen = document.querySelector(".gamescreen");
var answScreen = document.querySelector(".answers");
var timerInterval;
var score;
var highScores= [];

var questionPool = [
    {"question": "Commonly used data types DO NOT include:",
    "answer1": "strings",
    "answer2": "booleans",
    "answer3": "alerts",
    "answer4": "numbers",
    "correct": "alerts"
    },
    {"question": "The condition in an if / else statement is enclosed within ____.",
    "answer1": "quotes",
    "answer2": "curly brackets",
    "answer3": "parenthesis",
    "answer4": "square brackets",
    "correct": "parenthesis"
    },
    {"question": "Arrays in JavaScript can be used to store ____.",
    "answer1": "numbers and strings",
    "answer2": "other arrays",
    "answer3": "booleans",
    "answer4": "all of the above",
    "correct": "all of the above"
    },
    {"question": "String values must be enclosed within ____ when being assigned to variables.",
    "answer1": "commas",
    "answer2": "curly brackets",
    "answer3": "quotes",
    "answer4": "parenthesis",
    "correct": "quotes"
    },
    {"question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "answer1": "JavaScript",
    "answer2": "terminal / bash",
    "answer3": "for loops",
    "answer4": "console.log",
    "correct": "console.log"
    }
]

function countDown() {
      timerInterval = setInterval(function() {
      secondsLeft--;
      timeLeft.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        score = timeLeft.textContent;
        timeLeft.textContent = 0;
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
  }

function writeScreen() {
  if (questNum>0){
  questScreen.innerHTML = " ";
  answScreen.innerHTML = " ";
  }

  if (questNum >=5) {
    score = timeLeft.textContent;
    gameOver();
  }

  var currentQuestion = questionPool[questNum];
  
  var questDisp = document.createElement("h4");
  var text = document.createTextNode(currentQuestion.question);
  questDisp.appendChild(text);
  questScreen.appendChild(questDisp);
  
  var answ1 = document.createElement("li");
  var text = document.createTextNode(currentQuestion.answer1);
  answ1.appendChild(text);
  answScreen.appendChild(answ1);
  
  var answ2 = document.createElement("li");
  var text = document.createTextNode(currentQuestion.answer2);
  answ2.appendChild(text);
  answScreen.appendChild(answ2);
  
  var answ3 = document.createElement("li");
  var text = document.createTextNode(currentQuestion.answer3);
  answ3.appendChild(text);
  answScreen.appendChild(answ3);
  
  var answ4 = document.createElement("li");
  var text = document.createTextNode(currentQuestion.answer4);
  answ4.appendChild(text);
  answScreen.appendChild(answ4);

  var answ5 = document.createElement("li");
  var text = document.createTextNode(currentQuestion.answer5);
  answ5.appendChild(text);
  answScreen.appendChild(answ4);
  
  questNum += 1;
  }

  function gameOver(){
    questScreen.innerHTML = " ";
    answScreen.innerHTML = " ";
    timeLeft = 0;
    var gameOver = document.createElement("h2");
    var text = document.createTextNode("GAME OVER");
    gameOver.appendChild(text);
    questScreen.appendChild(gameOver);
    var userScore = document.createElement("h3");
    var text = document.createTextNode("Score: " + score);
    userScore.appendChild(text);
    questScreen.appendChild(userScore);
    var restart = document.createElement("h3");
    var text = document.createTextNode("Retry?");
    restart.appendChild(text);
    questScreen.appendChild(restart);
    var enterName = prompt("Enter Initials!");
    while (enterName.length > 3){
      enterName = prompt("Enter Initials!");
    }
    var highScores = JSON.parse(localStorage.getItem('highscores')) || [];
    highScores.push({name: enterName, score: score});
    localStorage.setItem('highscores', JSON.stringify(highScores));
  }

  function startGame() {
    startButton.innerHTML = " ";
    clearInterval(timerInterval);
    writeScreen();
    countDown();
  }

  function scoreScreen(){
    startButton.innerHTML = " ";
    questScreen.innerHTML = " ";
    answScreen.innerHTML = " ";
    var restart = document.createElement("h3");
    var text = document.createTextNode("Retry?");
    restart.appendChild(text);
    startButton.appendChild(restart);
    highScores = JSON.parse(localStorage.getItem('highscores')) || [];
    for (var i = 0; i < highScores.length; i++) {
    var currentScore = highScores[i];
    var viewScores = document.createElement("h4");
    var text = document.createTextNode(currentScore.name + ": " + currentScore.score);
    viewScores.appendChild(text);
    startButton.appendChild(viewScores);
    }
  }

  startButton.addEventListener('click', startGame);
  viewScores.addEventListener('click', scoreScreen);

  answScreen.addEventListener('click', event => {
    var currentQuestion = questionPool[(questNum - 1)];
    var ansSelect = event.target.textContent;
    if (ansSelect !== currentQuestion.correct) {
      secondsLeft -= 5;
      }
    if (ansSelect == currentQuestion.correct) {
		  startGame();
    }
  });

  questScreen.addEventListener('click', event => {
    var restart = event.target.textContent;
    location.reload();
  });