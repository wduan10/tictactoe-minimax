var grid = [];
var turn = 1;
var player1Score = 0;
var player2Score = 0;

function setup() {
  createCanvas(600, 600);
  for (var i=0; i<3; i++) {
    var temp = [];
    for (var j=0; j<3; j++) {
      var cell = new Cell(i, j);
      temp.push(cell);
    }
    grid.push(temp);
  }
}

function draw() {
  background(255);
  drawLines();
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      grid[i][j].display();
    }
  }
  hover(mouseX, mouseY);
}

function hover(x, y) {
  var j = Math.floor(x/(width/3));
  var i = Math.floor(y/(height/3));
  if (i < 0 || i > 2 || j < 0 || j > 2) return;
  if (grid[i][j].symbol != ' ') return;
  if (turn % 2 == 1) {
    grid[i][j].drawX(200);
  } else {
    grid[i][j].drawO(200);
  }
}

function resetGame() {
  turn = 1;
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      grid[i][j].symbol = ' ';
    }
  }
}

function gameOver(winner) {
  if (winner == 'X') {
    player1Score++;
    document.querySelector("#p1").style.display = "block";
    setTimeout(function() {
      document.querySelector("#p1").style.display = "none";
    }, 2000);
  } else if (winner == 'O') {
    player2Score++;
    document.querySelector("#p2").style.display = "block";
    setTimeout(function() {
      document.querySelector("#p2").style.display = "none";
    }, 2000);
  } else {
    document.querySelector("#tie").style.display = "block";
    setTimeout(function() {
      document.querySelector("#tie").style.display = "none";
    }, 2000);
  }
  setTimeout(resetGame, 2000);
}

function checkWin(board, mini) {
  for (var y=0; y<3; y++) {
    var xCount = 0;
    var oCount = 0;
    for (var x=0; x<3; x++) {
      if (board[y][x].symbol == 'X') {
        xCount++;
      } else if (board[y][x].symbol == 'O') {
        oCount++;
      }
    }
    if (xCount == 3) {
      if (!mini) gameOver('X');
      return "X";
    } else if (oCount == 3) {
      if (!mini) gameOver('O');
      return "O";
    }
  }
  for (var x=0; x<3; x++) {
    var xCount = 0;
    var oCount = 0;
    for (var y=0; y<3; y++) {
      if (board[y][x].symbol == 'X') {
        xCount++;
      } else if (board[y][x].symbol == 'O') {
        oCount++;
      }
    }
    if (xCount == 3) {
      if (!mini) gameOver('X');
      return "X";
    } else if (oCount == 3) {
      if (!mini) gameOver('O');
      return "O";
    }
  }
  if (board[0][0].symbol == board[1][1].symbol && board[1][1].symbol == board[2][2].symbol) {
    if (board[1][1].symbol == 'X') {
      if (!mini) gameOver('X');
      return "X";
    } else if (board[1][1].symbol == 'O') {
      if (!mini) gameOver('O');
      return "O";
    }
  }
  if (board[2][0].symbol == board[1][1].symbol && board[1][1].symbol == board[0][2].symbol) {
    if (board[1][1].symbol == 'X') {
      if (!mini) gameOver('X');
      return "X";
    } else if (board[1][1].symbol == 'O'){
      if (!mini) gameOver('O');
      return "O";
    }
  }
}

function mousePressed() {
  // if off of canvas, don't register
  if (turn % 2 == 0) return;
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  var x = Math.floor(mouseX/(width/3));
  var y = Math.floor(mouseY/(height/3));
  if (grid[y][x].symbol == ' ') {
    grid[y][x].symbol = 'X';
    turn++;
  } else {
    return;
  }
  var winner = checkWin(grid, false);
  if (winner == 'O' || winner == 'X') return;
  if (turn == 10) {
    gameOver("tie");
    return;
  }
  var decision = minimax(grid, turn, 0);
  var move = decision[0];
  console.log(decision[1]);
  grid[move[0]][move[1]].symbol = "O";
  turn++;
  checkWin(grid, false);
  if (turn == 10) {
    gameOver("tie");
  }
}

function drawLines() {
  stroke(0);
  strokeWeight(5);
  line(0, width/3, height, width/3);
  line(width/3, 0, width/3, height);
  line(2*width/3, 0, 2*width/3, height);
  line(0, 2*width/3, height, 2*width/3);
}
