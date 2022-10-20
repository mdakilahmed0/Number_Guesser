
console.clear();


//Default game values
let min = 1,
  max = 10;
winningNum = randomWinningNumber(min, max);
guessesLeft = 3;

function randomWinningNumber(min, max){
  let random =  Math.floor((Math.random()*(max-min+1)+min));
  console.log(random);
  return random;
}

//UI Elements
const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter the number between ${min} and ${max}.`, "red");
  } else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, You win!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game Over, You lost, the correct number was ${winningNum}.`)
    } else {
      guessInput.value = "";
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
    }
  }
});

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
  guessInput.style.borderColor = color;
};

const gameOver = (won, msg) => {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  setMessage(msg, color);


  //Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className = 'play-again';
};