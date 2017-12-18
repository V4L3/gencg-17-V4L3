// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
// var imported = document.createElement('script');
// imported.src = 'gui.js';
// document.head.appendChild(imported);
var circles = options.circles;
var circleSeeds = [];

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // The var are initialised in gui.js
  var shape;

  for (var i = 0; i < circles; i++) {
    circleSeeds.push(random(0, 3))
  }

}

function draw() {
  circles = options.circles;
  background(255)
  smooth();
  noFill();


  for (var i = 0; i < circles; i++) {
    circleHeight = windowHeight - (i * (800/circles))
    offset = i * options.movement
    strokeWeight(i % 5 + options.strokeWeight)
    stroke(options.circleColor)
    if(options.fill){fill(color(options.circleFillColor))}
    if(i % options.direction){ 
    arc(windowWidth / 2, windowHeight / 2, circleHeight, circleHeight, 
      mapMouseY(mouseY) + offset + circleSeeds[i], mapMouseX(mouseX) + offset + circleSeeds[i])    
    }else {
      arc(windowWidth / 2, windowHeight / 2, circleHeight, circleHeight, 
        -mapMouseY(mouseY) + offset + circleSeeds[i], -mapMouseX(mouseX) + offset + circleSeeds[i])      
    }
  }

}

function mapMouseY(pY) {
  return ((2 * PI) * pY) / windowHeight
}

function mapMouseX(pX) {
  return 2 * PI * pX / windowHeight
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

function mousePressed() {
  for (var i = 0; i < circles; i++) {
    circleSeeds[i] = (random(0, 3 ))
  }
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