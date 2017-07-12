// minimax algorithm
// scoring system 10 for win 5 for future win - for a loss 0 for a ?
// need to check if can reach terminal state or prevent other player from reaching terminal state.

// 1) initial state a players turn
// 2) successor fuction assesses moves
// 3) terminal states
// 4) utility function gives a numeric value to all the terminal states

// chooser max or min

// recursive function for max and min that keep calling each other until depth is 5(point where impossible to beat the AI).

// EXTRA FEATURES
// scoreboard
// two player mode

$(document).ready(function() {

  var moveArray = [],
      playerTurn = true,
  // terminal states array
      terminal = [
        ['A1','A2','A3'],
        ['B1','B2','B3'],
        ['C1','C2','C3'],
        ['A1','B1','C1'],
        ['A2','B2','C2'],
        ['A3','B3','C3'],
        ['A1','B2','C3'],
        ['A3','B2','C1']
      ],
  // current board status
      status = {
        A1: '',
        A2: '',
        A3: '',
        B1: '',
        B2: '',
        B3: '',
        C1: '',
        C2: '',
        C3: ''
      };

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
      $('.square').each(function() {
        if(!$(this).text()) {
          var section = $(this).attr('id')
          update('X', section, true);
          return false;
        }
      });
    }
  }

  // minimax function
  // function minimax(node, depth, maxPlayer) {
  //   // base case depth = 0 or termCheck true
  //
  // }

  // update the status function
  function update(symbol, sqr, turn) {
    $('#' + sqr).text(symbol);
    status[sqr] = symbol;
    playerTurn = turn;
    if(termCheck(symbol)) {
      console.log(symbol + " WINS");
      playerTurn = null
    } else {
      playerTurn = turn;
    }
  }

  // terminal states check function
  function termCheck(sym) {
    var count = 0;
    for(var i = 0; i < terminal.length; i++) {
      for(var j = 0; j < terminal[i].length; j++) {
        if (status[terminal[i][j]] === sym) {
          count++;
        } else {
          count = 0;
        }
        if (count === 3) {
          return true;
        }
      }
    }
  }

  // reset button clear board and status obj
  $('.reset').click(function() {
    $('.square').text('');
    $('.square').each(function() {
      item = $(this).attr('id');
      status[item] = '';
    });
    playerTurn = true;
  });

});
