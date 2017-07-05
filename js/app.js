$(document).ready(function() {

  var moveArray = [];
      playerTurn = true;

  // buttons for each square
  $('.square').each(function() {
    $(this).click(function() {
      var val = $(this).text();
      if (playerTurn && val !== 'X' && val !== 'O') {
        $(this).text('O');
        moveArray.push($(this).attr('id'));
        console.log(moveArray);
        playerTurn = false;
        checkWin();
        computer();
      }
    });
  });

  // minimax algorithm
  // scoring system 10 for win 5 for future win - for a loss 0 for a ?
  // need to check if can reach terminal state or prevent other player from reaching terminal state.


  // 1) initial state a players turn
  // 2) successor fuction assesses moves
  // 3) terminal states
  // 4) utility function gives a numeric value to all the terminal states

  // chooser max or min

  // recursive function for max and min that keep calling each other until depth is 5(point where impossible to beat the AI).
  
  // terminal states deprecated diffucult to compare...
  var wins = ['A1A2A3', 'B1B2B3', 'C1C2C3', 'A1B1C1', 'A2B2C2', 'A3B3C3', 'A1B2C3', 'A3B2C1'];
  // terminal states improved
  var winsV2 = [['A1','A2','A3'],['B1','B2','B3'],['C1','C2','C3'],['A1','B1','C1'],
    ['A2','B2','C2'],['A3','B3','C3'],['A1','B2','C3'],['A3','B2','C1']];
  // current board status this can be compared to terminal states
  var board = { A1: '', A2: '', A3: '', B1: '', B2: '', B3: '', C1: '', C2: '', C3: '' }

  // crude win checker test
  function checkWin() {
    wins.forEach(function(item){
      if(moveArray.sort().join('') === item) {
        console.log('checkWin moveArray = ' + moveArray);
        console.log("WIN");
      }
    });
  }

  // computer turn
  function computer() {
    $('.square').each(function() {
      if(!$(this).text()) {
        $(this).text('X');
        playerTurn = true;
        return false;
      }
    });
  }

  $('.reset').click(function() {
    console.log('reset pressed');
    $('.square').text('');
    moveArray = [];
  });


  // EXTRA FEATURES
  // scoreboard
  // two player mode

});
