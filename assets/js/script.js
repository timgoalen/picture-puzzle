"use strict";

const squares = document.querySelectorAll(".image");
// const body = getElementById("body");

const numsArray = [1, 2, 3, 4, 5, 6];
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
    squares[i].src = `assets/images/cat-img-mstr-3/cat-img-mstr-${randomNumsArray[i]}.jpg`;
  }
}

function getCurrentBoard() {
  //   make array of the current 'score'
  let currentBoard = [];
  for (let square of squares) {
    const currentSquare = parseInt(square.textContent);
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
  if (array[0][array[0].length - 5] === 1 && array[1][array[1].length - 5] === 2 && array[2][array[2].length - 5] === 3 && array[3][array[3].length - 5] === 4 && array[4][array[4].length - 5] === 5 && array[5][array[5].length - 5] === 6) {
    return true;
  } else {
    return false;
  }
}

function selectNextNum(event) {
  const imgSrc = event.target.src;
  const srcNum = parseInt(imgSrc.charAt(imgSrc.length - 5));
  let currentDisplay = srcNum;
  let nextInLine = randomNumsArray.shift();

  if (randomNumsArray.length === 0) {
    selectRandomArray();
  }

  if (currentDisplay !== nextInLine) {
    event.target.src = `assets/images/cat-img-mstr-3/cat-img-mstr-${nextInLine}.jpg`;
  } else {
    randomNumsArray.push(nextInLine);
    nextInLine = randomNumsArray.shift();
    event.target.src = `assets/images/cat-img-mstr-3/cat-img-mstr-${nextInLine}.jpg`;
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
let puzzleAlreadyComplete = checkForWinner(randomNumsArray);
while (puzzleAlreadyComplete) {
  selectRandomArray();
}

populateBoard();
// Get a new random order for player to start choosing from
selectRandomArray();
