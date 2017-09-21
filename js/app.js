// Requirements
// You can play against computer
// You can choose between X and Y
// Game resets when over so you can play again.

// EXTRA FEATURES
// scoreboard
// two player mode

var board;
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
var humanToken = 'O';
var aiToken = 'X';
var gameOver = false;

gameInit();

/* click events for the squares */
$('.square').click(function(event) {
  squareClick(event.target.id);
});

/* game initiator function removes message display creates
empty array with 9 elements containing index numbers clears
cells of text, styling and adds event listener */
function gameInit() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
      updateBoard(aiToken, aiMove(), 'ai');
    }
  }
  console.log(board);
}

/* update function adds player token to origBoard array
and cells on board. It checks if the turn has a winning
move and if so call the gameOver function */
function updateBoard(token, index, player) {
  $('#' + index).text(token);
  board[index] = token;
  if (winCheck(board, token)) {
    player === 'human' ? gameStatus('You Win!') : gameStatus('You Lose!');
    gameOver = true;
  }
}

/* game status function */
function gameStatus(message) {
  $('.status').text(message);
}

/* function to check winning move */
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

/* function that checks for draw */
function drawCheck() {
  // console.log(availableMoves(board));
  if (!availableMoves(board).length) {
    gameStatus('It\'s A Draw!');
    return true;
  }
}

/* function that returns array of available moves */
function availableMoves(testBoard) {
  var arr = [];
  for(var i = 0; i < testBoard.length; i++) {
    if (typeof testBoard[i] === 'number') arr.push(testBoard[i]);
  }
  return arr;
}

/* function that returns best move from minimax */
function aiMove() {
  return minimax(board, aiToken).index;
}

/* MINIMAX algorithm
1. return a value if a terminal state is found (+10, 0, -10)
2. go through available spots on the board
3. call the minimax function on each available spot (recursion)
4. evaluate returning values from function calls
5. and return the best value */

function minimax(tempBoard, player) {
  var available = availableMoves(tempBoard);

  if (winCheck(tempBoard, humanToken)) {
    return { score: -10 };
  } else if (winCheck(tempBoard, aiToken)) {
    return { score: 10 };
  } else if (!available.length) {
    return { score: 0 };
  }

  var moves = [];
  for (var i = 0; i < available.length; i++) {

    var move = {};
    move.index = tempBoard[available[i]];
    tempBoard[available[i]] = player;

    if (player === aiToken) {
      var result = minimax(tempBoard, humanToken);
      move.score = result.score;
    } else {
      var result = minimax(tempBoard, aiToken);
      move.score = result.score;
    }

    tempBoard[available[i]] = move.index
    moves.push(move);
  }

  var bestMove;
  if (player === aiToken) {
    var bestScore = -Infinity;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = Infinity;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
