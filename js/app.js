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

  var moveArray = [];
      playerTurn = true;

  // terminal states improved
  var terminal = [['A1','A2','A3'],['B1','B2','B3'],['C1','C2','C3'],['A1','B1','C1'],
['A2','B2','C2'],['A3','B3','C3'],['A1','B2','C3'],['A3','B2','C1']];
  // current board status this can be compared to terminal states
  var status = { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' };

  // buttons for each square
  $('.square').each(function() {
    $(this).click(function() {
      var val = $(this).text();
      if (playerTurn && val !== 'X' && val !== 'O') {
        var section = $(this).attr('id');
        // console.log(status);
        update('O', section, false);
        computer();
      }
    });
  });

  // computer turn
  function computer() {
    $('.square').each(function() {
      if(!$(this).text()) {
        var section = $(this).attr('id')
        update('X', section, true);
        return false;
      }
    });
  }

  // update the status if comp or player
  function update(val, sqr, turn) {
    // console.log('val = ' + val + ' sqr = ' + sqr + ' turn = ' + turn);
    $('#' + sqr).text(val);
    status[sqr] = val;
    playerTurn = turn;
    checkWin();
  }

  // crude win checker test
  function checkWin() {
    terminal.forEach(function(item) {
      var xcount = 0, ocount = 0;
      item.forEach(function(val) {
        if (status[val] === 'X') {
          xcount += 1;
        } else if (status[val] === 'O') {
          ocount += 1;
        }
      });
      if (xcount === 3) {
        console.log('X WIN');
      } else if (ocount === 3) {
        console.log('O WIN');
      }
    });
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