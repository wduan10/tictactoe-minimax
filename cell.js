class Cell {
  constructor(y, x) {
    this.y = y;
    this.x = x;
    this.symbol = ' ';
  }

  drawX(ourColor) {
    stroke(ourColor);
    strokeWeight(5);
    line(this.x*width/3+30, this.y*height/3+30, (this.x+1)*width/3-30, (this.y+1)*height/3-30);
    line(this.x*width/3+30, (this.y+1)*height/3-30, (this.x+1)*width/3-30, this.y*height/3+30);
  }

  drawO(ourColor) {
    stroke(ourColor);
    strokeWeight(5);
    ellipse(this.x*width/3 + width/6, this.y*height/3 + height/6, width/3-60, height/3-60);
  }

  display() {
    var ourColor = 0;
    if (this.symbol == 'X') {
      this.drawX(ourColor);
    } else if (this.symbol == 'O') {
      this.drawO(ourColor);
    }
  }
}
