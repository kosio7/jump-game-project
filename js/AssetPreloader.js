(function(scope) {
  /**
   * @class AssetPreloader
   */
  function AssetPreloader() {
    this.initialize();
  }
  var proto = AssetPreloader.prototype;

  proto.initialize = function() {
    this.assetsToLoad = 0;
    this.assetsLoaded = 0;
  };

  proto.loadAssets = function(array) {
    for (var i = 0; i < array.length; i++) {
      this.loadAsset(array[i]);
    }
  };

  proto.loadAsset = function(url) {
    var image = new Image();
    this[url] = image;
    this.assetsToLoad++;
    image.onload = this.onImageLoaded.bind(this);

    image.src = image.url = url;
  };

  proto.onImageLoaded = function(e) {
    this.assetsLoaded++;

    if (this.assetsLoaded === this.assetsToLoad) {
      if (this.onComplete) this.onComplete();
    }
  };
  scope.AssetPreloader = AssetPreloader;
} (window));