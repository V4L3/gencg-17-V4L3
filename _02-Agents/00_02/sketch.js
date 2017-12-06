// Global var

var agents = [];
var positions = [];
var gridResolutionX;
var gridResolutionY;
var tileSize = 100;

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
  initAgents();
 smooth();

}

function draw() {

   

  //drawOverlay();

  background(255, 10  )
  for (var i = 0; i < agents.length; i++) {
    agents[i].draw();
  }

}

function drawOverlay() {
  for (let x = 0; x < windowWidth; x++) {
    for (let y = 0; y < windowHeight; y++) {
      if (x >= mouseX + 100 && x + cos(this.angle) <= mouseX - 100) {
        if (y >= mouseY + 100 && y + sin(this.angle) <= mouseY - 100) {
          stroke(0);
          strokeWeight(4)
          point(x, y);
        }
      }
    }
  }
}


function initAgents() {
  let angle = random(0, 2 * PI)
  for (var i = 0; i < 100; i++) {
    let a = new Agent(random(0, windowWidth), random(0, windowHeight), 0, 10, random(0, 2 * PI), i)
    agents.push(a)
  }
}

function initAgentsOnGrid(){
  let angle = random(0, 2 * PI)
  console.log(gridResolutionX)
  for (var gridY = 0; gridY < gridResolutionY; gridY++) {
    for (var gridX = 0; gridX < gridResolutionX; gridX++) { 
      let posX = tileSize * gridX + tileSize / 2;
      let posY = tileSize * gridY + tileSize / 2;

      let a = new Agent(posX, posY, 0, 10, random(0, 2 * PI), gridX+gridY)
      console.log(a)
      agents.push(a)
    }
  }

}

class Agent {
  constructor(px, py, col, size, angle, position) {
    this.x = px;
    this.y = py;
    this.c = col;
    this.s = size
    this.offset = 2;
    this.left = true;
    this.angle = angle;
    this.bounceCount = 2000;
    this.position = position;
    this.collisionDelay = 0;
  }

  draw() {
    //background(255,10)
    strokeWeight(2)
    point(this.x + cos(this.angle), this.y + sin(this.angle) + noise(this.bounceCount), this.s, this.s, );
    this.movement();
    this.reachBorder();
    this.collisionDetection();
  }

  collisionDetection() {

    if (this.bounceCount < 0) {
      agents.splice(this.position, 1);
    }

    if (positions.length > 5 && this.collisionDelay <= 0) {
      for (let i = 0; i < positions.length - 1; i++) {
        if (this.x <= positions[i].x + 1 && this.x >= positions[i].x - 1) {
          if (this.y <= positions[i].y + 1 && this.y >= positions[i].y - 1) {

            

            // if (this.angle > 1.5 * PI) {
            //   this.angle = random(HALF_PI, PI);
            // } else if (this.angle > PI) {
            //   this.angle = random(0, HALF_PI);
            // } else if (this.angle > HALF_PI) {
            //   this.angle = random(1.5 * PI, 2 * PI)
            // } else {
            //   this.angle -= random(PI, 1.5 * PI)
            // }

          //this.angle = random(0, 2 * PI);
          // this.angle -= random(0,HALF_PI) ;
          // this.angle += random(0,HALF_PI)
          if(random(1)> 0.5){
            this.angle -= HALF_PI ;
          } else{
            this.angle += HALF_PI ;
          }
          
          
          this.bounceCount--;
          this.collisionDelay = 3;
        }
      }

    }
  } else {
    this.collisionDelay--
  }





}



reachBorder() {
  if (this.x > 0) {
    if (this.x < windowWidth) {
    }
    else {
      // going out on the right
      // pi random to the left
      this.angle = random(PI / 2, 3 * PI / 2);
    }
  }
  else {
    // going out on the left
    // pi random to the right
    this.angle = (-PI / 2) + random(0, PI);
  }

  if (this.y > 0) {
    if (this.y < windowHeight) {
    }
    else {
      // going out on the bottom
      this.angle = random(PI, TWO_PI);
    }
  }
  else {
    // going out on the top
    this.angle = random(0, PI);
  }
}

movement() {
  positions.push({ x: Math.round(this.x), y: Math.round(this.y) })
  this.x += cos(this.angle);
  this.y += sin(this.angle);
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