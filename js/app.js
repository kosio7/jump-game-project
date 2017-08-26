(function (scope) {
  function JumperApp() {
    this.initialize();
  }
  var proto = JumperApp.prototype;

  proto.initialize = function() {
    this.canvas = document.getElementById('game-canvas');
    this.canvas.width = 500;
    this.canvas.height = 250;
  
    this.stage = new createjs.Stage(this.canvas);
    createjs.Touch.enable(this.stage);  
    this.stage.addEventListener('stagemousedown', this.handleMouseDown.bind(this));

    console.log(this.stage);
    this.image = new Image();
    this.image.onload = this.onImageLoaded.bind(this);
    this.image.src = 'assets/char.png';
  };

  proto.onImageLoaded = function(e) {
    this.jumper = new Hero(this.image);
    this.jumper.x = this.jumper.y = 100;
    this.stage.addChild(this.jumper);
  
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.onTick.bind(this));
  };

  proto.onTick = function() {
    this.stage.update();
  };

  proto.handleMouseDown = function(e) {
    this.jumper.jump();
  };

  scope.JumperApp = JumperApp;
} (window));

window.onload = function() {
  new JumperApp();
};