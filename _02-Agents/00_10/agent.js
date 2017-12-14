class Agent {
  constructor(px, py, angle, position) {
    this.x = px;
    this.xOrigin = px;
    this.y = py;
    this.yOrigin = py;
    // this.c = col;
    // this.s = size
    this.offset = 2;
    this.left = true;
    this.angle = angle;
    this.bounceCount = 0;
    this.position = position;
    this.positions = []
    this.radiusincrease = 0;
  }

  draw() {
    strokeWeight(1)
    point(this.x + cos(this.angle), this.y + sin(this.angle) + noise(this.bounceCount));
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
    this.positions.push({ x: Math.round(this.x), y: Math.round(this.y) })
    this.x += cos(this.angle);
    this.y += sin(this.angle);
    this.angle += this.radiusincrease;
    this.radiusincrease+=10;





  }

}


// // Based on the code M_1_5_01.pde from
// // Generative Gestaltung, ISBN: 978-3-87439-759-9

// class Agent {

//   constructor(x, y) {

//     let _angle;
//     let _isOutside = false;
//     let _p = createVector(x, y);
//     let _pStart = createVector(x, y);
//     let _pOld = createVector(x, y);
//     let _stepSize = random(1, 5);

//     this.draw = function(noiseScale, noiseStrength, strokeWidth, drawMode){

//       if (drawMode == 1) {
//         _angle = noise(_p.x/noiseScale,_p.y/noiseScale) * noiseStrength;
//       } else {
//         _angle = noise(_p.x/noiseScale,_p.y/noiseScale) * 24; //
//         _angle = (_angle - toInt(_angle)) * noiseStrength;  //
//       }

//       _p.x += cos(_angle) * _stepSize;
//       _p.y += sin(_angle) * _stepSize;

//       if(_p.x<-10) _isOutside = true;
//       else if(_p.x>width+10) _isOutside = true;
//       else if(_p.y<-10) _isOutside = true;
//       else if(_p.y>height+10) _isOutside = true;

//       if (_isOutside) this.restart();

//       // Draw
//       strokeWeight(strokeWidth);
//       line(_pOld.x, _pOld.y, _p.x, _p.y);
//       point(_p.x, _p.y);

//       _pOld.set(_p);

//       _isOutside = false;
//     }

//     this.getPosition = function() { return _p; }

//     this.getAngle = function() { return _angle; }

//     this.setPosition = function(p) { _p = p; }

//     this.setAngle = function(angle) { _angle = angle; }

//     this.restart = function() {
//       _p.set(_pStart);
//       _pOld.set(_p);      
//     }

//   }

// }