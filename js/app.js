
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

/* token chooser function */
$('.chooser-button').click(function(event) {
  humanToken = event.target.id;
  humanToken === 'X' ? aiToken = 'O' : aiToken = 'X';
  $('.chooser').addClass('handle');
  gameInit();
});

/* click events for the squares */
$('.square').click(function(event) {
  squareClick(event.target.id);
});

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
      updateBoard(aiToken, aiMove(), 'ai');
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
function availableMoves(testBoard) {
  var arr = [];
  for(var i = 0; i < testBoard.length; i++) {
    if (typeof testBoard[i] === 'number') arr.push(testBoard[i]);
  }
  return arr;
}

/* Ai move function returns best move from minimax */
function aiMove() {
  return minimax(board, aiToken).index;
}

/* Minimax algorithm function for unbeatable ai */
function minimax(tempBoard, player) {
  var available = availableMoves(tempBoard);

  /* Base Cases return value if terminal state found */
  if (winCheck(tempBoard, humanToken)) {
    return { score: -10 };
  } else if (winCheck(tempBoard, aiToken)) {
    return { score: 10 };
  } else if (!available.length) {
    return { score: 0 };
  }

  /* Cycles through available spots on the board.
  Creates move object and calls minimax function
  on each square recursively */
  var moves = [];

  for (var i = 0; i < available.length; i++) {

    var move = {};
    move.index = tempBoard[available[i]];
    tempBoard[available[i]] = player;

    var result;
    if (player === aiToken) {
      result = minimax(tempBoard, humanToken);
      move.score = result.score;
    } else {
      result = minimax(tempBoard, aiToken);
      move.score = result.score;
    }

    tempBoard[available[i]] = move.index
    moves.push(move);
  }

  /* Evaluates returning values from function calls
  and ends by returning the best score */
  var bestMove, bestScore;
  if (player === aiToken) {
    bestScore = -Infinity;
    for(var j = 0; j < moves.length; j++) {
      if (moves[j].score > bestScore) {
        bestScore = moves[j].score;
        bestMove = j;
      }
    }
  } else {
    bestScore = Infinity;
    for(var k = 0; k < moves.length; k++) {
      if (moves[k].score < bestScore) {
        bestScore = moves[k].score;
        bestMove = k;
      }
    }
  }

  return moves[bestMove];
}
