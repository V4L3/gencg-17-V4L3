class Agent {
  constructor(px, py, col, size, angle, position) {
    this.x = px;
    this.xOrigin = px;
    this.y = py;
    this.yOrigin = py;
    this.c = col;
    this.s = size
    this.offset = 2;
    this.left = true;
    this.angle = angle;
    this.bounceCount = 2000;
    this.position = position;
    this.positions = []
    this.steps = 10;
    this.increment = this.s / this.steps;
  }

  draw() {
    let rotation = random(0, 1);
    for (let i = 0; i < this.steps; i++) {
      strokeWeight(1)

      //Beginning Control point
      let p1 = {
        x: - this.s / 2,
        y: - this.s / 2 + this.increment
      };

      //First Point
      let p2 = {
        x: p1.x + this.increment / 2 - this.increment / random([3, 4, 5, 6, 7, 8]),
        y: p1.y - this.increment / 2 + this.increment / random([3, 4, 5, 6, 7, 8])
      };

      //Ending control Point
      let p4 = {
        x: - this.s / 2 + this.increment,
        y: - this.s / 2
      };

      //Second Point
      let p3 = {
        x: p4.x - this.increment / 2 + this.increment / random([3, 4, 5, 6, 7, 8]),
        y: p4.y + this.increment / 2 - this.increment / random([3, 4, 5, 6, 7, 8])
      };


      push()
      translate(this.x, this.y);
      // then pivot the grid
      if (rotation > 0.5) {
        rotate(radians(90));
      }

      noFill();
      strokeWeight(0.7);
      beginShape();
      curveVertex(p1.x, p1.y);
      curveVertex(p1.x, p1.y);
      curveVertex(p2.x, p2.y);
      curveVertex(p3.x, p3.y);
      curveVertex(p4.x, p4.y);
      curveVertex(p4.x, p4.y);
      endShape();
      pop()

      //curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
      this.increment += this.s / this.steps
    }
    this.increment = this.s / this.steps
    for (let i = 0; i < this.steps; i++) {
      strokeWeight(1)

      //Beginning Control point
      let p1 = {
        x: + this.s / 2,
        y: + this.s / 2 + this.increment
      };

      //First Point
      let p2 = {
        x: p1.x + this.increment / 2 - this.increment / random([3, 4, 5, 6, 7, 8]),
        y: p1.y - this.increment / 2 + this.increment / random([3, 4, 5, 6, 7, 8])
      };

      //Ending control Point
      let p4 = {
        x: + this.s / 2 + this.increment,
        y: + this.s / 2
      };

      //Second Point
      let p3 = {
        x: p4.x - this.increment / 2 + this.increment / random([3, 4, 5, 6, 7, 8]),
        y: p4.y + this.increment / 2 - this.increment / random([3, 4, 5, 6, 7, 8])
      };


      push()
      translate(this.x, this.y);
      // then pivot the grid
      if (rotation > 0.5) {
        rotate(radians(90));
      }

      noFill();
      strokeWeight(0.7);
      beginShape();
      curveVertex(p1.x, p1.y);
      curveVertex(p1.x, p1.y);
      curveVertex(p2.x, p2.y);
      curveVertex(p3.x, p3.y);
      curveVertex(p4.x, p4.y);
      curveVertex(p4.x, p4.y);
      endShape();
      pop()
      this.increment -= this.s / this.steps
    }
  }
}