"use_strict"

// Global var
var tileCount; 
var angle
var agents, density, letterPositions;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  tileCount = 23;
  angle = [PI,HALF_PI, 2*PI, 0];
  noLoop();
  density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var might be initialised in gui.js
  backgroundGrey = 0;
  background(backgroundGrey);
  // Init 
  initScene();
  // Draw text
  noStroke();
  fill(backgroundGrey, options.txtAlpha);
  textSize(options.txtSize);
  text(options.txt, width / 2 - textWidth(options.txt) / 2, height / 2 + options.txtSize / 2);
}

function draw() {
  

  background(255);
  smooth();

  for (let gridX = 0; gridX < tileCount; gridX++) {
    for (let gridY = 0; gridY < tileCount; gridY++) {

      let posX = width / tileCount * gridX;
      let posY = width / tileCount * gridY;

      arc(posX, posY, 60, 60, random(angle), random(angle))
      arc(posX, posY, 50, 50, random(angle), random(angle))
      arc(posX, posY, 40, 40, random(angle), random(angle))
      arc(posX, posY, 30, 30, random(angle), random(angle))
      

      // ellipse(posX, posY, 60)
      // ellipse(posX, posY, 50)
      // ellipse(posX, posY, 40)
      // ellipse(posX, posY, 30)

    }
  }

}

function initScene() {
  background(0);
  fill(1);
  textSize(options.txtSize);
  text(options.txt, width / 2 - textWidth(options.txt) / 2, height / 2 + options.txtSize / 2);

  // Load pixels
  letterPositions = [];
  agents = [];
  var step = options.step;
  let w = width * density;
  let h = height * density;
  let container = document.getElementById('p5Container');
  ctx = container.firstChild.getContext("2d");
  let data = ctx.getImageData(0, 0, w, h).data;
  let position = 0;
  for (var i = 0; i < w; i += step) {
    for (var j = 0; j < h; j += step) {
      if (data[((i + j * w) * 4) + 1] == 1) {
        letterPositions.push({ x: Math.round(this.x), y: Math.round(this.y) })
        let a0 = new Agent(random(0,windowWidth),random(0,windowHeight),i/density, j/density, random(0,2*PI), position)
        agents.push(a0);
        position++;
      }
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
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}