
var options = {
    // Text
    txt: "DIGITAL IDEATION",
    txtSize: 150,
    step: 6,
    refresh: function () { initScene() },
    // Draw
    overlayAlpha: 10, 
    //agentsAlpha: 90,
    strokeWidth: 0.3,
    drawMode: 1,
    agentsColor: [255, 255, 255],
    patternMode: 2,
    patternColor:[255, 255, 255],
    refreshSeed: function(){ newSeed()},
    backgroundColor: [0,0,0]
};

window.onload = function() {
  var gui = new dat.GUI();
  // Text
  gui.add(options, 'txt');
  gui.add(options, 'txtSize').step(1);
  gui.add(options, 'step').min(1).max(100).step(1);
  // Refresh
  gui.add(options, 'refresh');
  gui.add(options, 'refreshSeed');
  // Draw
  gui.add(options, 'overlayAlpha').min(0).max(255).step(.1);
  //gui.add(options, 'agentsAlpha').min(0).max(255).step(.1);
  gui.add(options, 'strokeWidth').min(0).max(10).step(.1);
  gui.add(options, 'drawMode', [1, 2,3] );
  gui.addColor(options, 'agentsColor')
  //Pattern
  gui.add(options, 'patternMode', ["1", "2","3"] );
  gui.addColor(options, 'patternColor')
  gui.addColor(options, 'backgroundColor')
};