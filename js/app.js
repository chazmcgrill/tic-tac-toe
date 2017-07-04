$(document).ready(function() {

  var moveArray = [];
      playerTurn = true;

  // buttons for each square
  $('.square').each(function() {
    $(this).click(function() {
      if (playerTurn) {
        $(this).text('O');
        moveArray.push($(this).attr('id'));
        console.log(moveArray);
        playerTurn = false;
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
  var wins = ['A1A2A3', 'B1B2B3', 'C1C2C3', 'A1B1C1', 'A2B2C2', 'A3B3C3', 'A1B2C3', 'A3B2C1'];
  // 4) utility function gives a numeric value to all the terminal states

  // chooser max or min

  // recursive function for max and min that keep calling each other until depth is 5(point where impossible to beat the AI).


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


  // EXTRA FEATURES
  // reset buttons
  // scoreboard
  // two player mode

});
