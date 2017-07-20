// 2) successor fuction assesses moves
// 4) utility function gives a numeric value to all the terminal states

// Requirements
// You can play against computer
// You can choose between X and Y
// Game resets when over so you can play again.

// EXTRA FEATURES
// scoreboard
// two player mode

$(document).ready(function() {

  var moveArray = [],
      playerTurn = true,
      termStates = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ],
      status = [0,0,0,0,0,0,0,0,0];
      humanToken = 'O',
      aiToken = 'X',
      fc = 0;


  // buttons for each square
  $('.square').each(function() {
    $(this).click(function() {
      var val = $(this).text();
      if (playerTurn && val !== 'X' && val !== 'O') {
        var section = $(this).attr('id');
        update('O', section, false);
        computer();
      }
    });
  });

  // computer turn calls minimax algorithm
  function computer() {
    if(playerTurn !== null) {
      var index = minimax(status, true);
      console.log('fc = ' + fc);
      console.log(index);
      update('X', index.index, true);
    }
  }


  // update the status function
  function update(symbol, sqr, turn) {
    // console.log('in update function');
    $('#' + sqr).text(symbol);
    status[sqr] = symbol;
    if (winCheck(symbol, status)) {
      statusUpdate(symbol, "Wins!");
    } else if (drawCheck(status)) {
      statusUpdate("It's a", "Draw!");
    } else {
      playerTurn = turn;
      // computer();
    }
  }

  // status update on screen
  function statusUpdate(sym, status) {
    $('.status').text(sym + ' ' + status);
    playerTurn = null;
  }

  // terminal states check function
  // loops through each terminal state and checks if they match
  // the specified board status
  function winCheck(symbol, board) {
    for(var i = 0; i < 8; i++) {
      for(var j = 0; j < 3; j++) {
        if (board[termStates[i][j]] === symbol) {
          if (j === 2) {
            return true
          }
        } else {
          break;
        }
      }
    }
  }

  // check if draw
  function drawCheck(board) {
    for(var i = 0; i < 9; i++) {
      if (board[i] === 0) {
        return false;
      }
    }
    return true;
  }

  //  reset function clear board and status obj
  function reset() {
    $('.square').text('');
    $('.status').text('');
    $('.square').each(function() {
      item = $(this).attr('id');
      status[item] = 0;
    });
    playerTurn = true;
  }

  // reset button calls reset function
  $('.reset').click(function() {
    reset();
  });


  // minimax algorithm function
  function minimax(board, player) {
    fc++;
    // console.log('board = ' + board + ' / maxPlayer = ' + maxPlayer);

    // node starts at depth 0 and finishes at either
    // a draw or a terminal state win or loss determined by max/min state
    if (winCheck(aiToken, board)) {
      // console.log('max win detected');
      return { score: 10 };
    } else if (winCheck(humanToken, board)) {
      // console.log('min win detected');
      return { score: -10 };
    } else if (drawCheck(board)) {
      // console.log('draw detected');
      return { score: 0 };
    }

    // variables to catch max value and index
    var moves = [];

    // maxPlayer ? player = 'X' : player = 'O';
    // console.log('player = ' + player);

    // loop through each empty node
    for (var i = 0; i < 9; i++) {
      if (board[i] === 0) {

        var move = {};
        tempBoard = board.slice();

        move.index = i;
        tempBoard[i] = player;
        // console.log(tempBoard);

        if (player === aiToken) {
          var result = minimax(tempBoard, humanToken);
          move.score = result.score;
        } else {
          var result = minimax(tempBoard, aiToken);
          move.score = result.score;
        }

        moves.push(move);
      }

    }

    console.log(moves);

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


});
