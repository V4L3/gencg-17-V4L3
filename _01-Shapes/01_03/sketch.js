"use_strict";

// Global var
var tileCount; 
var angle

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  tileCount = 15;
  angle = [PI,HALF_PI, 2*PI, 0];
  noLoop();
}

function draw() {
  

  background(255);
  smooth();

  for (let gridX = 0; gridX < tileCount; gridX++) {
    for (let gridY = 0; gridY < tileCount; gridY++) {

      let posX = width / tileCount * gridX;
      let posY = width / tileCount * gridY;

      // rect(posX, posY, 60, 60)

      let randomAngle = random(angle);
      
      strokeWeight(1)
      arc(posX, posY, 60, 60, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 50, 50, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 40, 40, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 30, 30, 0 + randomAngle, HALF_PI + randomAngle)
      strokeWeight(4)
      point(posX, posY)

      // ellipse(posX, posY, 60)
      // ellipse(posX, posY, 50)
      // ellipse(posX, posY, 40)
      // ellipse(posX, posY, 30)

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