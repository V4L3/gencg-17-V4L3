class Agent {
  constructor(px, py, ex, ey, angle, position) {
    this.x = px;
    this.ex = ex;
    this.y = py;
    this.ey = ey;
    this.positionVector = createVector(this.x, this.y);
    this.endVector = createVector(this.ex, this.ey);
    this.direction = p5.Vector.sub(this.endVector, this.positionVector);
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = angle;
    this.bounceCount = 0;
    this.position = position;
    this.positions = []
    this.radiusincrease = 0;
    this.radiusincrease2 = 0;
    this.mode3Angle = angle;
    this.increasing = true;
    this.increasing2 = true;
    this.maxOffset = 100000 * cos(this.angle);
  }

  draw() {
    strokeWeight(1)
    point(this.positionVector.x, this.positionVector.y);
    this.movement();
  }

  movement() {
    let faderX = mouseX / width;
    let faderY = mouseY / height;
    let t = millis() / 1000;

    if (this.increasing) {
      if (this.radiusincrease < 300) {
        this.positionVector.x += this.direction.x / 300;
        this.positionVector.y += this.direction.y / 300;
        this.radiusincrease++
      } else {
        this.increasing = false;
      }
    } else if (options.drawMode == 1) {
      this.positionVector.x += cos(this.angle);
      this.positionVector.y += sin(this.angle);
      this.angle += this.radiusincrease2;
      if (this.increasing2) {
        if (this.radiusincrease2 < 150) {
          this.radiusincrease2++
        } else {
          this.increasing2 = false;
        }
      } else {
        if (this.radiusincrease2 > -150) {
          this.radiusincrease2--
        } else {
          this.radiusincrease2--
        }
      }

    } else if (options.drawMode == 2) {
      this.offsetX = map(faderX, 0, windowWidth, 0, this.maxOffset)
      this.offsetY = map(faderY, 0, windowWidth, 0, this.maxOffset)
      this.positionVector.x = this.endVector.x + this.offsetX;
      this.positionVector.y = this.endVector.y + this.offsetY;
    } else if (options.drawMode == 3) {
      this.positionVector.x = this.endVector.x + 7 * cos(this.mode3Angle);
      this.positionVector.y = this.endVector.y + 7 * sin(this.mode3Angle);
      this.mode3Angle += PI / 100
    } else if (options.drawMode == 4) {
      
    }

  }

}