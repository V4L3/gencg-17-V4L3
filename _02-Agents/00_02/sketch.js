// Global var

var agents = [];

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  initAgents();
}

function draw() {

  //background(255)
  for (var i = 0; i < agents.length; i++) {
    agents[i].draw();
  }

}

function initAgents() {
  let angle = random(0, 2*PI)
  for (var i = 0; i < 100; i++) {
    let a = new Agent(random(0, windowWidth), random(0, windowHeight), 0, 10, random(0, 2*PI))
    agents.push(a)
  }
}

class Agent {
  constructor(px, py, col, size, angle) {
    this.x = px;
    this.y = py;
    this.c = col;
    this.s = size
    this.offset = 2;
    this.left = true;
    this.angle = angle;
  }

  draw() {
    point(this.x + cos(this.angle), this.y + sin(this.angle) + 10 * noise(this.offset), this.s, this.s, );
    this.offset++;
    this.movement();
    //collisionDetection();
  }

  collisionDetection(){
    let pixelColors = get(toInt(posX),toInt(posY));
    if ( brightness(color(pixelColors)) != brightness(color(backgroundGrey)) || reachedBorder) {
      
    }
  }

  movement() {
    if (this.x > windowWidth || this.y > windowHeight) {

    } else {
      this.x += cos(this.angle);
      this.y += sin(this.angle);
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