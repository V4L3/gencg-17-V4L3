// Global var
var formResolution = 15;
var stepSize = 10;
var distortionFactor = 1;
var initRadius = 1000;
var centerX, centerY;
var x = [];
var y = [];

var filled = true;
var freeze = false; 

var angle


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  smooth();
  centerX = width/2; 
  centerY = height/2;
  angle = radians(360/(formResolution));
  for (var i=0; i<formResolution; i++){
    x[i] = cos(angle*i) * initRadius;
    y[i] = sin(angle*i) * initRadius;
  }

    stroke(2);
    background(255);
}

function draw() {

  // // floating towards mouse position
  // if (mouseX != 0 || mouseY != 0) {
  //   centerX += (mouseX-centerX) * 0.01;
  //   centerY += (mouseY-centerY) * 0.01;
  // }

  // calculate new points
  for (var i=0; i<formResolution; i++){
    x[i] += random(-stepSize,stepSize);
    y[i] += random(-stepSize,stepSize);
    // ellipse(x[i], y[i], 5, 5);
  }

  strokeWeight(3.75);
  if (filled) fill(100,100,random(255));
  else noFill();

  beginShape();
  // start controlpoint
  curveVertex(x[formResolution-1]+centerX, y[formResolution-1]+centerY);

  // only these points are drawn
  for (var i=0; i<formResolution; i++){
    curveVertex(x[i]+centerX, y[i]+centerY);
  }
  curveVertex(x[0]+centerX, y[0]+centerY);

  // end controlpoint
  curveVertex(x[1]+centerX, y[1]+centerY);
endShape();

if(initRadius >= 0){initRadius -= 10}
else{noLoop()}
for (var i=0; i<formResolution; i++){
  x[i] = cos(angle*i) * initRadius;
  y[i] = sin(angle*i) * initRadius;
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