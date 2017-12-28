function drawPattern2() {
  console.log("2")
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