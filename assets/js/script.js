const squares = document.querySelectorAll(".squares");
// const body = getElementById("body");

const numsArray = [1, 2, 3, 4];
const numsArrayLength = numsArray.length;
let randomNumsArray = [];

// try with Fisher-Yates Shuffle Algorithm instead?
function selectRandomArray() {
  let numsArrayCopy = numsArray.slice();
  //   empty randomNumsArray
  randomNumsArray = [];
  for (let i = 0; i < numsArrayLength; i++) {
    let randomIndex = Math.floor(Math.random() * numsArrayCopy.length);
    randomNumsArray.push(numsArrayCopy.splice(randomIndex, 1)[0]);
  }
}

function populateBoard() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = `<p>${randomNumsArray[i]}</p>`;
  }
}

function getCurrentBoard() {
  //   make array of the current 'score'
  let currentBoard = [];
  for (let square of squares) {
    currentSquare = parseInt(square.textContent);
    currentBoard.push(currentSquare);
  }
  let puzzleComplete = checkForWinner(currentBoard);

  if (puzzleComplete) {
    // setTimeout(alert("Yay! Did it!"), 4000);
    setTimeout(function () {
      setBackgroundColour("green");
    }, 100);
  } else {
    setBackgroundColour("white");
  }
}

function setBackgroundColour(colour) {
  document.body.style.backgroundColor = colour;
}

function checkForWinner(array) {
  if (array[0] === 1 && array[1] === 2 && array[2] === 3 && array[3] === 4) {
    return true;
  } else {
    return false;
  }
}

function selectNextNum(event) {
  let currentDisplay = parseInt(event.target.textContent);
  let nextInLine = randomNumsArray.shift();

  if (randomNumsArray.length === 0) {
    selectRandomArray();
  }

  if (currentDisplay !== nextInLine) {
    event.target.textContent = nextInLine;
  } else {
    randomNumsArray.push(nextInLine);
    nextInLine = randomNumsArray.shift();
    event.target.textContent = nextInLine;
  }

  getCurrentBoard();
}

// Add event listeners
for (let square of squares) {
  square.addEventListener("click", selectNextNum);
}

// Select random arrangement
selectRandomArray();
// Check initial arrabngemtn isn't already complete
puzzleAlreadyComplete = checkForWinner(randomNumsArray);
while (puzzleAlreadyComplete) {
  selectRandomArray();
}

populateBoard();
// Get a new random order for player to start choosing from
selectRandomArray();
