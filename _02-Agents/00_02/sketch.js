// Global var

var agents = [];
var positions = [];

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
  let angle = random(0, 2 * PI)
  for (var i = 0; i < 50; i++) {
    let a = new Agent(random(0, windowWidth), random(0, windowHeight), 0, 10, random(0, 2 * PI), i)
    agents.push(a)
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
  }

  draw() {
    point(this.x + cos(this.angle), this.y + sin(this.angle) + 2* noise(this.offset), this.s, this.s, );
    //this.offset++;

    this.movement();
    this.reachBorder();
    this.collisionDetection();
  }

  collisionDetection() {
    // let pixelColors = get(toInt(this.x), toInt(this.y));
    // if (color(pixelColors) == color(255)) {
    //    noLoop();
    // } else {console.log(brightness((color(pixelColors))))}


    if (positions.length > 5) {
      for (let i = 0; i < positions.length - 1; i++) {
        if (this.x <= positions[i].x + 1 && this.x >= positions[i].x - 1) {
          if (this.y <= positions[i].y + 1 && this.y >= positions[i].y - 1) {
            //console.log("collision");
            this.angle = random(0,2*PI)
          }
        }

      }
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