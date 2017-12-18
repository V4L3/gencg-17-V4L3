var options = {
  circles: 6,
  strokeWeight: 2,
  movement: 70, 
  direction: 3, 
  circleFillColor: [255, 120, 0], //RGB   
  circleColor: [0, 0, 0],
  fill: false,
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'circles').min(3).max(15).step(1);
  gui.add(options, 'strokeWeight').min(1).max(5).step(0.5);
  gui.add(options, 'movement').min(0).max(100).step(10);
  gui.add(options, 'direction').min(0).max(5).step(1);
  gui.addColor(options, 'circleColor');
  gui.add(options, 'fill');
  gui.addColor(options, 'circleFillColor');
};