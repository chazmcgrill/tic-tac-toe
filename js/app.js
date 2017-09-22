
// EXTRA FEATURES
// scoreboard
// two player mode

var gameOver = false,
    humanToken = 'O',
    aiToken = 'X',
    board;
const termStates = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

/* game initiator function removes message display
creates empty array with 9 elements containing index
numbers clears cells of text, styling and adds event
listener */
function gameInit() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $('button').css('display', 'none');
  $('.square').text('');
  gameStatus('');
  gameOver = false;
}

/* function for cell click events checks if cell is
vacant if so plays human player move following this it
takes computer move if game not a tie */
function squareClick(move) {
  if (typeof board[move] === 'number' && !gameOver) {
    updateBoard(humanToken, move, 'human');
    if(!drawCheck() && !gameOver) {
      updateBoard(aiToken, minimax(board, aiToken, 1).index, 'ai');
    }
  }
}

/* update function adds player token to origBoard array
and cells on board. It checks if the turn has a winning
move and if so call the gameOver function */
function updateBoard(token, index, player) {
  $('#' + index).text(token);
  board[index] = token;
  if (winCheck(board, token)) {
    player === 'human' ? gameStatus('You Win!') : gameStatus('You Lose!');
    $('button').css('display', 'inline-block');
    gameOver = true;
  }
}

/* game status function */
function gameStatus(message) {
  $('.status').text(message);
}

/* function that checks for win state */
function winCheck(currentBoard, token) {
  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 3; j++) {
      if (currentBoard[termStates[i][j]] === token) {
        if (j === 2) return true;
      } else {
        break;
      }
    }
  }
}

/* function that checks for draw state */
function drawCheck() {
  if (!availableMoves(board).length) {
    gameStatus('It\'s A Draw!');
    $('button').css('display', 'inline-block');
    return true;
  }
}

/* function that returns array of available moves */
function availableMoves(currentBoard) {
  var arr = [];
  for(var i = 0; i < currentBoard.length; i++) {
    if (typeof currentBoard[i] === 'number') arr.push(currentBoard[i]);
  }
  return arr;
}

/* Minimax algorithm function for unbeatable ai */
function minimax(tempBoard, turn, depth) {
  var tempAvailSquares = availableMoves(tempBoard),
      maxValue = -Infinity,
      minValue = Infinity,
      movesArray = [],
      bestSpot;

  /* Base Cases return value if terminal state found
  on any of the squares minus number for human turn
  positive number for ai turn valued highest on lowest
  depth */
  if (winCheck(tempBoard, humanToken)) {
    return { value: depth - 10 };
  } else if (winCheck(tempBoard, aiToken)) {
    return { value: 10 - depth };
  } else if (!tempAvailSquares.length) {
    return { value: 0 };
  }

  /* Cycles through available spots on the board.
  Creates move object with index and value, calls
  minimax function on each square recursively and
  pushes move to movesArray array */
  for (var i = 0; i < tempAvailSquares.length; i++) {
    var moveObj = {},
        returnResult;

    moveObj.index = tempBoard[tempAvailSquares[i]];
    tempBoard[tempAvailSquares[i]] = turn;

    if (turn === aiToken) {
      returnResult = minimax(tempBoard, humanToken, depth + 1);
      moveObj.value = returnResult.value;
    } else {
      returnResult = minimax(tempBoard, aiToken, depth + 1);
      moveObj.value = returnResult.value;
    }

    tempBoard[tempAvailSquares[i]] = moveObj.index;
    movesArray.push(moveObj);
  }

  /* Evaluates returning values from function calls
  and ends by returning the best result */
  if (turn === aiToken) {
    for (var j = 0; j < movesArray.length; j++) {
      if (movesArray[j].value > maxValue) {
        maxValue = movesArray[j].value;
        bestSpot = j;
      }
    }
  } else {
    for (var k = 0; k < movesArray.length; k++) {
      if (movesArray[k].value < minValue) {
        minValue = movesArray[k].value;
        bestSpot = k;
      }
    }
  }
  return movesArray[bestSpot];

}

/* token chooser click event */
$('.chooser-button').click(function(event) {
  humanToken = event.target.id;
  humanToken === 'X' ? aiToken = 'O' : aiToken = 'X';
  $('.chooser').addClass('handle');
  gameInit();
});

/* squares click events */
$('.square').click(function(event) {
  squareClick(event.target.id);
});

/* reset click event */
$('.reset').click(function() {
  gameInit();
});
