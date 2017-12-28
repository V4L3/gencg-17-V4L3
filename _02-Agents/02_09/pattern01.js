function drawPattern1() {
  console.log("1")
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