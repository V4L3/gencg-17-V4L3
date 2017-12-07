// Noise generated circle

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, radius;
var actRandomSeed, count, pointsInner, pointsOuter;
var circlePosX;
var circlePosY;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  backgroundGrey = 0;
  count = 150;
  pointsInner = [count];
  pointsOuter = [count];
  //background(backgroundGrey);
  radius = height / 2;

  let angle = radians(360 / count);
  for (let i = 0; i < count; i++) {
    let x = width / 2 + cos(angle * i) * windowHeight / 2;
    let y = height / 2 + sin(angle * i) * windowHeight / 2;
    pointsOuter[i] = createVector(x, y);
  }
}

function draw() {
  //background(255)
  background(backgroundGrey, 20);
  smooth();

  // Create points array
  let faderX = mouseX / width;
  let t = millis() / 1000;
  let r = windowHeight / 2;//map(mouseY,0,height,10,radius);
  let angle = radians(360 / count);

  circlePosX = map(mouseX, 0, windowWidth, windowWidth / 2 - windowWidth / 10, windowWidth / 2 + windowWidth / 10);
  circlePosY = map(mouseY, 0, windowHeight, windowHeight / 2 - windowHeight / 10, windowHeight / 2 + windowHeight / 10)


  // fill(255)
  // ellipse(windowWidth / 2, windowHeight / 2, windowHeight)
  // fill(255)
  // ellipse(circlePosX, circlePosY, r)



  //Create Points on inncer circle
  for (let i = 0; i < count; i++) {
    let offset = noise(t, i * faderX) * 50;
    let x = circlePosX +noise(t, i* faderX) * 50 + cos(angle * i) * r / 2; //width/2 + cos(angle*i)*radiusRand;
    let y = circlePosY +noise(t, i* faderX) * 50+ sin(angle * i) * r / 2; //height/2 + sin(angle*i)*radiusRand;
    pointsInner[i] = createVector(x, y);
  }


  //Draw
  // stroke(255,50);
  // beginShape();
  // for (let i=0; i<count; i++){
  //   fill(255);
  //   ellipse(pointsInner[i].x, pointsInner[i].y,2,2);
  //   noFill();
  //   curveVertex(pointsInner[i].x, pointsInner[i].y);
  //   if (i==0 || i==count-1) curveVertex(pointsInner[i].x, pointsInner[i].y);
  // }
  // endShape(CLOSE);

  stroke(255)
  for (let i = 0; i < count; i++) {
    line(pointsInner[i].x, pointsInner[i].y, pointsOuter[i].x, pointsOuter[i].y)
    // let direction = Math.atan2(pointsInner[i].x - pointsOuter[i].x, pointsOuter[i].y, pointsOuter[i].y)
    
    // let px = pointsInner[i].x
    // let py = pointsInner[i].y
    // for (let y = 0; i < 100; i++) {
    //   point(px, py)
    //   px += 4*cos(direction);
    //   py += 4*sin(direction);
    // }

  }

}


function keyPressed() {
  if (key == DELETE || key == BACKSPACE) background(360);
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

//  conversion
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