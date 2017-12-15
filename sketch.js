// Global var

var agents = [];
//var positions = [];
var gridResolutionX;
var gridResolutionY;
var tileSize = 50;
var increment = 0;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(255);
  gridResolutionX = round(width / tileSize) + 1;
  gridResolutionY = round(height / tileSize) + 1;
  initAgentsOnGrid();
  smooth();
  rectMode(CENTER);
  noLoop();


  // for (var gridY = 0; gridY < gridResolutionY; gridY++) {
  //   for (var gridX = 0; gridX < gridResolutionX; gridX++) {
  //     let posX = tileSize * gridX - tileSize / 2;
  //     let posY = tileSize * gridY - tileSize / 2;
  //     strokeWeight(0.15);
  //     fill(255);
  //     // save drawing state for later
  //     push();

  //     // move the origin to the pivot point
  //     translate(posX, posY);

  //     // then pivot the grid
  //     rotate(radians(90));

  //     rect(0, 0, tileSize, tileSize);

  //     //revert to original drawing state
  //     pop();

  //     strokeWeight(3);
  //     point(posX, posY)


  //   }
  // }

  opentype.load('fonts/linowrite.ttf', function (err, font) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      var ctx = document.getElementById('defaultCanvas0').getContext('2d');
      // Construct a Path object containing the letter shapes of the given text.
      // The other parameters are x, y and fontSize.
      // Note that y is the position of the baseline.
      var myGlyphs = font.stringToGlyphs('Digital Ideation');
      // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).


      myGlyphs.forEach(element => {
        //console.log(element)
        push();
        translate(100 + increment, 100)
        scale(1, -1);
        fill(random(0))
        beginShape();
        element.path.commands.forEach(point => {
          vertex(point.x / 10, point.y / 10)
        })
        endShape();
        pop();

        //console.log(element.getBoundingBox().x2 - element.getBoundingBox().x1)
        //let offset = element.getBoundingBox().x2
        if (element.name != "space") {
          increment += element.xMax / 10;
        } else {
          increment += 60
        }
      })
    }
  });

}

function draw() {

  let faderX = mouseX / width;
  let t = millis() / 1000;



}

function initAgentsOnGrid() {
  let angle = random(0, 2 * PI)
  for (var gridY = 0; gridY < gridResolutionY; gridY++) {
    for (var gridX = 0; gridX < gridResolutionX; gridX++) {
      let posX = tileSize * gridX + tileSize / 2;
      let posY = tileSize * gridY + tileSize / 2;

      let a0 = new Agent(posX, posY, 0, tileSize, random(0, 2 * PI), gridX + gridY)
      agents.push(a0)
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