/*
  - Player can configure range numbers and set difficulty
  - Player has certain amount of guesses based on difficulty setup
  - On every turn show player how much guesses he has left
  - Winning Case, Losing case where guesses != 0, game over case
    ° Winning Case:
      * Message "congrats", button: play again
    ° Losing Case with guesses !=0:
      * Message "wrong num" and how many turns left
    ° Game Over Case:
      * Message game over, show winning number
      * button: play again
*/

const startGameButton = document.getElementById("start-game_button");
startGameButton.addEventListener("click", function(){

  // Validation of input numbers
  if (isNaN(parseInt(document.getElementById("start-num").value)) ||
      isNaN(parseInt(document.getElementById("end-num").value)) ||
      parseInt(document.getElementById("start-num").value) >= parseInt(document.getElementById("end-num").value)
     ) {
       alert("Please enter your numbers.");
  } else {
    startGame();
  }

});

function startGame() {
  // UI Elements
  const gameConfig = document.querySelector(".game-config"),
        gameBody = document.querySelector(".game-body"),
        setFirstNum = document.querySelector(".first-num"),
        setLastNum = document.querySelector(".last-num"),
        gameDifficulty = document.getElementById("game-difficulty"),
        guessButton = document.querySelector("#guessed-num_button"),
        guessInput = document.getElementById("guessed-num"),
        message = document.querySelector(".message");
  
  // Game Values      
  const getFirstNum = parseInt(document.getElementById("start-num").value),
        getLastNum = parseInt(document.getElementById("end-num").value);

  let triesLeft;
    switch (gameDifficulty.value) {
      case "Easy":
        triesLeft = 5;
        break;
      case "Normal":
        triesLeft = 3;
        break;
      case "Hard":
        triesLeft = 2;
        break;
    }
  let winningNum = getRandomNumber(getFirstNum, getLastNum);

  // Hide Config & Show Game after game starts
  gameConfig.classList.add("hidden");
  gameBody.classList.remove("hidden");

  // Set Start & End numbers in game message
  setFirstNum.textContent = getFirstNum;
  setLastNum.textContent = getLastNum; 

  // Game logic
  guessButton.addEventListener("mousedown", function(){
    let guessInput = parseInt(document.getElementById("guessed-num").value);
    
    // Guess value validation
    if (
      isNaN(guessInput) ||
      guessInput < getFirstNum ||
      guessInput > getLastNum
    ) {
      gameStatus("Please enter valid number!", "red", false, false);
    } else {
      guessResults();
    }

    // Game functionality
    function guessResults() {
      let guessInput = parseInt(document.getElementById("guessed-num").value);

      // Winning case
      if (guessInput === winningNum) {
        gameStatus("Congratulations, you won the game!", "green", true, true);

      } else {

        // Game over case
        if (triesLeft === 1) {
          gameStatus(`Game over. Winning number was ${winningNum}.`, "red", true, true);
        } else {

          // Loosing case where there is guesses left
          triesLeft -= 1;
          gameStatus(`Sorry, wrong number. Guesses left: ${triesLeft}.`, "orange", false, false);
        }
      }
    }
  })

  // Define Play Again function
  function playAgain() {
    const playButton = document.querySelector(".play-again");
    playButton.addEventListener("mousedown", function(){
      
      // Clear inputs
      document.querySelectorAll("input[id$=-num]").forEach(current => {
        current.value = "";
      })

      // Reload
      location.reload();
    });
  }

  /* Helper Functions */

  // Game status constructor
  /*
    - Function takes four arguments:
      ° msg for defining value for "message" variable
      ° color for setting text, background & input border colors
      ° button (boolean, true or false) for changing "Start game" button to "Play again" button
      ° inputs for disabling the "guessInput" input field
  */

  function gameStatus(msg, color, button, inputs) {
    message.textContent = msg;
    message.style.color = color;
    guessInput.style.borderColor = color;
    gameConfig.parentElement.parentElement.style.backgroundColor = color;
    
    // Add play again button
    if (button === true) {
      guessButton.value = "Play again";
      guessButton.classList.add("play-again", "button-primary");
      playAgain();
    }
    
    // Disable inputs when game is over
    if (inputs === true) {
      guessInput.disabled = "true";
    }

    // Clear input fields when there is guesses left
    if(button === false && inputs === false) {
      guessInput.value = "";
    }
  }

  // Define function for getting random number
  function getRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }
}