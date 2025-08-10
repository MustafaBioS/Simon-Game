var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

var buttons = document.querySelectorAll("button");
for (var i = 0; i < 4; i++) {
   buttons[i].addEventListener("click", function() {
   
      
   var userChosenColor = this.id;

   userClickedPattern.push(userChosenColor);

   console.log(userClickedPattern);
   
   var audio = new Audio('sounds/' + userChosenColor + ".mp3")
      audio.play()

      this.classList.add('pressed');
   setTimeout(() => {
      this.classList.remove('pressed');
   }, 150);

   checkAnswer(userClickedPattern.length - 1);
});
}


document.addEventListener("keypress", function() {
   if (!gameStarted) {
      newSequence();
      gameStarted = true;
   }
   

})

function newSequence() {
   userClickedPattern = [];
   level++;
   document.querySelector(".title").textContent = "Level " + level;
   var randomNum = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNum];

       gamePattern.push(randomChosenColor);

   var memorize = document.querySelector("#" + randomChosenColor);

   

   memorize.classList.add('press')
   setTimeout(() => {
      memorize.classList.remove('press')
   }, 100);

   
   var audio2 = new Audio('sounds/' + randomChosenColor + ".mp3");
   audio2.play();

 
}


function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log('success');

      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(() => {
            newSequence();
         }, 650);
      }
   } else {
      console.log("wrong");

      var audio3 = new Audio('sounds/wrong.mp3')
      audio3.play()

      document.querySelector("body").classList.add("game-over");
      setTimeout(() => {
         document.querySelector("body").classList.remove("game-over");
      }, 200);

      document.querySelector('.title').textContent = "Game Over, Press Any Key to Restart";

      startOver()
   }
}

function startOver() {
   level = 0;
   gamePattern = [];
   gameStarted = false;
   document.querySelector('.title').textContent = "Press A Key to Start";

}