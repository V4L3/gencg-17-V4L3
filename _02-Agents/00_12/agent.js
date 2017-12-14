class Agent {
  constructor(px, py, ex,ey, angle, position) {
    this.x = px;
    this.ex = ex;
    this.y = py;
    this.ey = ey;
    this.positionVector = createVector(this.x,this.y);
    this.endVector = createVector(this.ex,this.ey);
    this.direction = p5.Vector.sub(this.endVector,this.positionVector);
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = angle;
    this.bounceCount = 0;
    this.position = position;
    this.positions = []
    this.radiusincrease = 0;
    this.increasing = true;
    this.maxOffset = 100000*cos(this.angle);
  }

  draw() {
    strokeWeight(1)
    point(this.positionVector.x, this.positionVector.y );
    this.movement();
    //this.reachBorder();
    //this.collisionDetection();
  }

  collisionDetection() {

    if (this.bounceCount < 0) {
      agents.splice(this.position, 1);
    }

    if (this.positions.length > 5) {
      for (let i = 0; i < this.positions.length - 1; i++) {
        if (this.x <= this.positions[i].x + 1 && this.x >= this.positions[i].x - 1) {
          if (this.y <= this.positions[i].y + 1 && this.y >= this.positions[i].y - 1) {
            this.angle = random(0, 2 * PI);
            this.bounceCount--;
          }
        }
      }
    }





  }



  reachBorder() {
    if (this.x > this.xOrigin - this.s / 2) {
      if (this.x < this.xOrigin + this.s / 2) {
      }
      else {
        // going out on the right
        // pi random to the left
        this.angle = random(PI / 2, 3 * PI / 2);
      }
    }
    else {
      // going out on the left
      // pi random to the right
      this.angle = (-PI / 2) + random(0, PI);
    }

    if (this.y > this.yOrigin - this.s / 2) {
      if (this.y < this.yOrigin + this.s / 2) {
      }
      else {
        // going out on the bottom
        this.angle = random(PI, TWO_PI);
      }
    }
    else {
      // going out on the top
      this.angle = random(0, PI);
    }
  }

  movement() {
      //this.positions.push({ x: Math.round(this.x), y: Math.round(this.y) })
      let faderX = mouseX / width;
      let faderY = mouseY / height;
      let t = millis() / 1000;  
    
      if(this.increasing){
        if(this.radiusincrease < 100){
          this.positionVector.x += this.direction.x/100;
          this.positionVector.y += this.direction.y/100;
          this.radiusincrease++
        }else{
          this.increasing = false;
        }
      }else{
        this.offsetX = map(faderX, 0, windowWidth, 0, this.maxOffset)
        this.offsetY = map(faderY, 0, windowWidth, 0, this.maxOffset)
        this.positionVector.x = this.endVector.x + this.offsetX;
        this.positionVector.y = this.endVector.y + this.offsetY;
       
      }
    

  }

}