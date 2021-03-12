var timeLeft = document.querySelector(".timer");
var startButton = document.querySelector(".strtbtn");
var viewScores = document.querySelector(".viewscores");
var currentQuestion;
var score = 0;
var secondsLeft = 5;
var questNum = 0;
var questScreen = document.querySelector(".gamescreen");
var answScreen = document.querySelector(".answers");
var quest;
var answ1;
var answ2;
var answ3;
var answ4;
var answc;

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
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeLeft.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        gameOver();
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

function writeScreen() {
  if (questNum>0){
  questScreen.innerHTML = " ";
  answScreen.innerHTML = " ";
  }

  if (questNum>=5){
    gameOver()
    return;
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
  console.log(questNum);
  }

  function gameOver(){
    questScreen.innerHTML = " ";
    answScreen.innerHTML = " ";
    return;
  }

  function startGame() {
    secondsLeft = 5;  
    countDown();
    writeScreen();
  }

  startButton.addEventListener("click", startGame);
  answScreen.addEventListener('click', event => {
    var currentQuestion = questionPool[(questNum - 1)];
    var ansSelect = event.target.textContent;
    console.log(currentQuestion.correct);
    console.log(ansSelect);
    if (ansSelect !== currentQuestion.correct) {
      secondsLeft -= 5;
      }
    if (ansSelect == currentQuestion.correct) {
    secondsLeft += 5;
		startGame();
    }
});