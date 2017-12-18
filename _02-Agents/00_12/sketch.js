// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// Some of the var might be initialised in gui.js
var agents, density, letterPositions;

var tileCount;
var angle
var seed;
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
  // Comment it out if the sketch is too slow
  density = displayDensity();
  pixelDensity(density);
  gridResolutionX = round(width / tileSize) + 1;
  gridResolutionY = round(height / tileSize) + 1;
  initTiles();
  // Init var
  // some of the var might be initialised in gui.js
  backgroundGrey = [options.backgroundColor[0], options.backgroundColor[1], options.backgroundColor[2], options.overlayAlpha];
  background(backgroundGrey);
  // Init 
  initScene();
  // Draw text
  noStroke();
  fill(backgroundGrey);
  textSize(options.txtSize);
  text(options.txt, width / 2 - textWidth(options.txt) / 2, height / 2 + options.txtSize / 2);
  tileCount = 23;
  angle = [PI, HALF_PI, 2 * PI, 0];
  stroke(255);
  seed = random(0, 100)
}

function draw() {
  backgroundGrey = [options.backgroundColor[0], options.backgroundColor[1], options.backgroundColor[2], options.overlayAlpha];
  smooth();
  background(backgroundGrey);
  randomSeed(seed);

  //Draw Pattern
  switch (options.patternMode) {
    case "1":
      initPattern1()
      break;
    case "2":
      initPattern2();
      break;
    case "3":
      initPattern3();
      break;
    default:
  }

  //Draw agents  
  noiseDetail(options.octaves, options.falloff);
  stroke(options.agentsColor, options.agentsAlpha);
  for (var i = 0; i < agents.length - 1; i++) {
    agents[i].draw(options.noiseScale, options.noiseStrength, options.strokeWidth, options.drawMode);
  }




}

function initPattern1() {
  for (let gridX = 0; gridX < tileCount; gridX++) {
    for (let gridY = 0; gridY < tileCount; gridY++) {

      let posX = width / tileCount * gridX;
      let posY = width / tileCount * gridY;

      stroke(options.patternColor)
      strokeWeight(0.5)
      noFill()

      if (random(0, 1) < 0.5) arc(posX, posY, 60, 60, random(0, 2 * PI), random(0, 2 * PI))
      if (random(0, 1) < 0.5) arc(posX, posY, 50, 50, random(0, 2 * PI), random(0, 2 * PI))
      if (random(0, 1) < 0.5) arc(posX, posY, 40, 40, random(0, 2 * PI), random(0, 2 * PI))
      if (random(0, 1) < 0.5) arc(posX, posY, 30, 30, random(0, 2 * PI), random(angle))
    }
  }
}

function initPattern2() {
  for (let gridX = 0; gridX < tileCount; gridX++) {
    for (let gridY = 0; gridY < tileCount; gridY++) {

      let posX = width / tileCount * gridX;
      let posY = width / tileCount * gridY;

      let randomAngle = random(angle);

      strokeWeight(1)
      stroke(options.patternColor)
      arc(posX, posY, 63, 63, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 53, 53, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 43, 43, 0 + randomAngle, HALF_PI + randomAngle)
      arc(posX, posY, 33, 33, 0 + randomAngle, HALF_PI + randomAngle)
      strokeWeight(4)
    }
  }
}

function initPattern3() {
  generatePattern();
  strokeWeight(0.5)
  stroke(options.patternColor)
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
    let seedX = Math.floor(random(0, gridResolutionX))
    let seedY = Math.floor(random(0, gridResolutionY))
    gridArray[seedX][seedY][Math.floor(random(0, 5))] = true
  }
}

function drawArc(centerX, centerY, angle) {

  noFill()
  arc(centerX, centerY, tileSize, tileSize, 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize + (tileSize / 10), tileSize + (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize + 2 * (tileSize / 10), tileSize + 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize - (tileSize / 10), tileSize - (tileSize / 10), 0 + angle, HALF_PI + angle);
  arc(centerX, centerY, tileSize - 2 * (tileSize / 10), tileSize - 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);


}

function generatePattern() {
  for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
    for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {

      if (gridArray[gridX][gridY].includes(true, true)) {
      } else {

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
        let a0 = new Agent(random(0, windowWidth), random(0, windowHeight), i / density, j / density, random(0, 2 * PI), position)
        agents.push(a0);
        position++;
      }
    }
  }
}

//New random Seed
function newSeed() {
  seed = random(0, 100);
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(backgroundGrey);
  if (keyCode == 32) {
    for (var i = 0; i < agents.length - 1; i++) agents[i].restart();
  }
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') options.drawMode = 1;
  if (key == '2') options.drawMode = 2;
  if (key == ' ') {
    let newNoiseSeed = floor(random(100000));
    noiseSeed(newNoiseSeed);
  }

  if (keyCode == UP_ARROW) options.falloff += 0.05;
  if (keyCode == DOWN_ARROW) options.falloff -= 0.05;
  if (options.falloff > 1.0) options.falloff = 1.0;
  if (options.falloff < 0.0) options.falloff = 0.0;

  if (keyCode == LEFT_ARROW) options.octaves--;
  if (keyCode == RIGHT_ARROW) options.octaves++;
  if (options.octaves < 0) options.octaves = 0;

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