class CirclePattern {
    constructor(){
  
    }
  
    draw(){
       // console.log("circledraw")
      for (var i = 0; i < circles; i++) {
        
        circleHeight = windowHeight - (i * (800/circles))
        offset = i
        strokeWeight(30)
        point(windowWidth/2,windowHeight/2)
        stroke(0)
        //if(options.fill){fill(color(options.circleFillColor))}
        //if(i % options.direction){ 
        arc(windowWidth / 2, windowHeight / 2, circleHeight, circleHeight, 
          mapMouseY(mouseY) + offset + circleSeeds[i], mapMouseX(mouseX) + offset + circleSeeds[i])    
        // }else {
        //   arc(windowWidth / 2, windowHeight / 2, circleHeight, circleHeight, 
        //     -mapMouseY(mouseY) + offset + circleSeeds[i], -mapMouseX(mouseX) + offset + circleSeeds[i])      
        // }
      }
    }
  }