// Global var

var agents = [];
//var positions = [];
var gridResolutionX;
var gridResolutionY;
var tileSize = 50;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(255);
  gridResolutionX = round(width / tileSize) + 1;
  gridResolutionY = round(height / tileSize) + 1;
  initAgentsOnGrid();
  smooth();
  rectMode(CENTER);
  noLoop();


  // for (var gridY = 0; gridY < gridResolutionY; gridY++) {
  //   for (var gridX = 0; gridX < gridResolutionX; gridX++) {
  //     let posX = tileSize * gridX - tileSize / 2;
  //     let posY = tileSize * gridY - tileSize / 2;
  //     strokeWeight(0.15);
  //     fill(255);
  //     // save drawing state for later
  //     push();

  //     // move the origin to the pivot point
  //     translate(posX, posY);

  //     // then pivot the grid
  //     rotate(radians(90));

  //     rect(0, 0, tileSize, tileSize);

  //     //revert to original drawing state
  //     pop();

  //     strokeWeight(3);
  //     point(posX, posY)


  //   }
  // }

}

function draw() {

  //background(255, 20)
  for (var i = 0; i < agents.length; i++) {
    agents[i].draw();
  }

}

function initAgentsOnGrid() {
  let angle = random(0, 2 * PI)
  for (var gridY = 0; gridY < gridResolutionY; gridY++) {
    for (var gridX = 0; gridX < gridResolutionX; gridX++) {
      let posX = tileSize * gridX + tileSize / 2;
      let posY = tileSize * gridY + tileSize / 2;

      let a0 = new Agent(posX, posY, 0, tileSize, random(0, 2 * PI), gridX + gridY)
      agents.push(a0)
    }
  }

}

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

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}