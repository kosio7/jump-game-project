(function (scope) {

  /**
   * @class JumperApp
   */
  function JumperApp() {
    this.initialize();
  }
  var proto = JumperApp.prototype;
  const hero = 'assets/char.png';
  const platform = 'assets/platform.png';

  proto.initialize = function() {
    this.canvas = document.getElementById('game-canvas');
    this.canvas.width = 500;
    this.canvas.height = 250;
  
    // Here we create the stage, we also enable touch events.
    this.stage = new createjs.Stage(this.canvas);
    createjs.Touch.enable(this.stage);  
    this.stage.addEventListener('stagemousedown', this.handleMouseDown.bind(this));

    this.assets = new AssetPreloader();
    this.assets.onComplete = this.assetsLoaded.bind(this);

    this.assets.loadAssets([hero, platform]);
  };

  /**
   * After the assets have been preloaded, this method 
   * adds them to the stage and also sets the desired framerate 
   * and adds listener for tick events dispatched by EaselJS.
   * @method assetsLoaded
   * @param {event} e 
   */
  proto.assetsLoaded = function(e) {
    this.jumper = new Hero(this.assets[hero]);
    this.jumper.x = this.jumper.y = 100;
    this.jumper.scaleX = 0.5;
    this.jumper.scaleY = 0.5;

    this.platform = new createjs.Bitmap(this.assets[platform]);
    this.platform.x = 110;
    this.platform.y = 170;

    this.stage.addChild(this.platform);
    this.stage.addChild(this.jumper);
  
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', this.onTick.bind(this));
  };

  /**
   * We fire this method on each tick, this simply updates the stage.
   * @method onTick
   */
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