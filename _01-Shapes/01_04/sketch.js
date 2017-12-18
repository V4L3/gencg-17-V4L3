"use_strict";

// Global var
var gridArray = [];
var tileSize = 70;
var gridResolutionX;
var gridResolutionY;
var maxCount = 1000;
var count = 0;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  gridResolutionX = round(width / tileSize) + 1;
  gridResolutionY = round(height / tileSize) + 1;
  initTiles();
  //randomSeed(1);
  //noLoop();
  frameRate(3)
  generatePattern();
}

function draw() {
  generatePattern();
  background(0);
  smooth();


  // for (var gridY = 0; gridY < gridResolutionY; gridY++) {
  //   for (var gridX = 0; gridX < gridResolutionX; gridX++) {
  //     let posX = tileSize * gridX - tileSize / 2;
  //     let posY = tileSize * gridY - tileSize / 2;
  //     strokeWeight(0.15);
  //     fill(255);
  //     //rect(posX, posY, tileSize, tileSize);
  //     strokeWeight(3);
  //     point(posX, posY)
  //   }
  // }


  for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
    for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {

      let posX = tileSize * gridX + tileSize / 2;
      let posY = tileSize * gridY + tileSize / 2;
      let randomAngle

      if (gridArray[gridX][gridY][0]) {
        randomAngle = PI;
        drawArc(posX, posY, randomAngle)
      }

      if (gridArray[gridX][gridY][1]) {
        randomAngle = 1.5 * PI;
        drawArc(posX, posY, randomAngle)
      }

      if (gridArray[gridX][gridY][2]) {
        randomAngle = HALF_PI;
        drawArc(posX, posY, randomAngle)
      }

      if (gridArray[gridX][gridY][3]) {
        randomAngle = 0;
        drawArc(posX, posY, randomAngle)
      }

    }
  }

  if (count < maxCount) {
    count++;
  } else {
    //noLoop();
  }

}

function drawArc(centerX, centerY, angle) {

  noFill()
  strokeWeight(2)
  stroke(255)
  arc(centerX, centerY, tileSize, tileSize, 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize + (tileSize / 10), tileSize + (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize + 2 * (tileSize / 10), tileSize + 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize - (tileSize / 10), tileSize - (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize - 2 * (tileSize / 10), tileSize - 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);


}

function initTiles() {
  for (var x = 0; x < gridResolutionX; x++) {
    gridArray[x] = []; // create nested array
    for (var y = 0; y < gridResolutionY; y++) {
      gridArray[x][y] = [false, false, false, false]
    }
  };
  setSeed();
}

function setSeed() {
  for (var x = 0; x < 2; x++) {
    let seedX = Math.floor(random(1, gridResolutionX-1))
    let seedY = Math.floor(random(1, gridResolutionY-1))
    gridArray[seedX][seedY][Math.floor(random(0, 5))] = true
  }
}

function generatePattern() {
  for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
    for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {

      if(gridArray[gridX][gridY].includes(true, true)){
      }else{

      //Right Tile
      if (gridArray[gridX + 1][gridY][0]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][3] = true
        }
        else {
          gridArray[gridX + 1][gridY][2] = true
        }
      }
      else if (gridArray[gridX + 1][gridY][2]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][1] = true
        }
        else {
          gridArray[gridX + 1][gridY][0] = true
        }

      }

      //Left Tile
      if (gridArray[gridX - 1][gridY][1]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][2] = true
        }
        else {
          gridArray[gridX - 1][gridY][3] = true
        }

      } else if (gridArray[gridX - 1][gridY][3]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][0] = true
        }
        else {
          gridArray[gridX - 1][gridY][1] = true
        }
      }

      //Bottom Tile
      if (gridArray[gridX][gridY + 1][0]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][3] = true
        }
        else {
          gridArray[gridX][gridY + 1][1] = true
        }
      } else if (gridArray[gridX][gridY + 1][1]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][2] = true
        }
        else {
          gridArray[gridX][gridY + 1][0] = true
        }
      }

      //Top Tile
      if (gridArray[gridX][gridY - 1][2]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][1] = true
        }
        else {
          gridArray[gridX][gridY - 1][3] = true
        }
      } else if (gridArray[gridX][gridY - 1][3]) {
        if (random(0, 1) < 0.5) {
          gridArray[gridX][gridY][0] = true
        }
        else {
          gridArray[gridX][gridY - 1][2] = true
        }
      }
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
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}