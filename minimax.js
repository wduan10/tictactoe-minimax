function minimax(board, turn, currentMove) {
  //console.log(turn);
  if (checkWin(board, true) == "X") {
    return [currentMove, -10];
  } else if (checkWin(board, true) == "O") {
    return [currentMove, 10];
  } else if (turn == 10) {
    return [currentMove, 0];
  }

  var availableSpots = [];
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      if (board[i][j].symbol == ' ') {
        availableSpots.push([i, j]);
      }
    }
  }
  var scores = [];
  for (var spot of availableSpots) {
    if (turn % 2 == 0) {
      board[spot[0]][spot[1]].symbol = "O";
    } else {
      board[spot[0]][spot[1]].symbol = "X";
    }
    var score = minimax(board, turn+1, spot);
    score[0] = spot;
    board[spot[0]][spot[1]].symbol = ' ';
    scores.push(score);
  }

  var aIMove, playerMove;
  var bestAIScore = -11;
  var bestPlayerScore = 11;
  for (var score of scores) {
    if (turn % 2 == 0) {
      if (score[1] > bestAIScore) {
        bestAIScore = score[1];
        aIMove = score[0];
      }
    } else {
      if (score[1] < bestPlayerScore) {
        bestPlayerScore = score[1];
        playerMove = score[0];
      }
    }
  }
  if (turn % 2 == 0) {
    return [aIMove, bestAIScore];
  } else {
    return [playerMove, bestPlayerScore];
  }
}
