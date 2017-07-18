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
  // improved terminal & status array
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

  // computer turn ai
  function computer() {
    if(playerTurn !== null) {
      // $('.square').each(function() {
      //   var $this = $(this);
      //   // if square is empty call minimax
      //   if(!$this.text()) {
      //     var section = $this.attr('id')
      //     update('X', section, true);
      //     return false;
      //   }
      // });
      var index = minimax(status, 0, 'X');
      update('X', index, true);
    }
  }

  // minimax function
  function minimax(board, depth, player) {
    console.log(board);

    // node starts at depth 0 and finishes at either
    // a draw or
    // a terminal state win or loss determined by max/min state
    if (winCheck(player, board)) {
      return 10 or -10;
    } else if (drawCheck(board)) {
      return 0;
    }

    // loop through each node

    // maximising player

    // minimising player

    // basic logic to place peices
    for (var i = 0; i < 9; i++) {
      if (board[i] === 0) {
        return i;
      }
    }

    // base case loop finished and depth at 0
    if (depth === 0) {
      return maxValue and index;
    }

  }

// update('O', section, false);
  // update the status function
  function update(symbol, sqr, turn) {
    $('#' + sqr).text(symbol);
    status[sqr] = symbol;
    if (winCheck(symbol, status)) {
      statusUpdate(symbol, "Wins!");
    } else if (drawCheck(status)) {
      statusUpdate("It's a", "Draw!");
    } else {
      playerTurn = turn;
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

});
