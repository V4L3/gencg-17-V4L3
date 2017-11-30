"use_strict";

// Global var
var angle;
var gridArray = [];
var tileSize = 80;
var gridResolutionX;
var gridResolutionY;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  angle = [PI, HALF_PI, 2 * PI, 0];
  gridResolutionX = round(width / tileSize) + 2;
  gridResolutionY = round(height / tileSize) + 2;
  initTiles();
  noLoop();
}

function draw() {

  background(255);
  smooth();


  for (var gridY = 0; gridY < gridResolutionY; gridY++) {
    for (var gridX = 0; gridX < gridResolutionX; gridX++) {
      let posX = tileSize * gridX - tileSize / 2;
      let posY = tileSize * gridY - tileSize / 2;
      strokeWeight(0.15);
      fill(255);
      rect(posX, posY, tileSize, tileSize);
    }
  }


  for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
    for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {
      // use only active tiles
      if (gridArray[gridX][gridY] == '1') {
        let randomAngle = random(angle);
        let posX
        let posY

        // if(gridX % 2 == 0){
        //    posX = tileSize * gridX;
        //    posY = tileSize * gridY;
        // } else {
           posX = tileSize * gridX + tileSize / 2;
           posY = tileSize * gridY + tileSize / 2;
        // }
        
        noFill()
        strokeWeight(3)
        arc(posX, posY, tileSize, tileSize, 0 + randomAngle, HALF_PI + randomAngle);
        arc(posX, posY, tileSize + (tileSize/10) , tileSize + (tileSize/10), 0 + randomAngle, HALF_PI + randomAngle);
        arc(posX, posY, tileSize + 2 * (tileSize/10) , tileSize + 2 * (tileSize/10), 0 + randomAngle, HALF_PI + randomAngle); 
        arc(posX, posY, tileSize - (tileSize/10), tileSize - (tileSize/10), 0 + randomAngle, HALF_PI + randomAngle);      
        arc(posX, posY, tileSize - 2 * (tileSize/10) , tileSize - 2 * (tileSize/10), 0 + randomAngle, HALF_PI + randomAngle);         
        // decimalResult is the also the index for the shape array
        //shape(modules[decimalResult],posX, posY, tileSize, tileSize);

      }
    }
  }




}

function initTiles() {
  for (var x = 0; x < gridResolutionX; x++) {
    gridArray[x] = []; // create nested array
    for (var y = 0; y < gridResolutionY; y++) {
      gridArray[x][y] = Math.floor(random(0,2))
    }
  }
}

function drawPattern() {
  for (var x = 0; x < gridResolutionX; x+=3) {
    gridArray[x] = []; // create nested array
    for (var y = 0; y < gridResolutionY; y+=3) {
      gridArray[x][y] = 2
      gridArray[x][y + 1] = 1
      gridArray[x][y - 1] = 1
      gridArray[x + 1][y] = 1
      gridArray[x - 1][y] = 1
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