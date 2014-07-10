(function(window){
  var LOADER;
  var _listImages = [ "http://goo.gl/gvFAEJ", "http://goo.gl/njgsns", "http://goo.gl/HE9smH", "http://goo.gl/Z8tDSq", "http://goo.gl/tsghBx" ];

  function initLoader() {
    // create and initialize LoaderImages class, passing a array with list images 
    LOADER = new LoaderImages(_listImages);
    // creating the listeners
    addEventListener('LOAD_PROGRESS', progressBar, false);
    addEventListener('LOAD_COMPLETE', closeLoading, false);
  }

  function closeLoading() {
    addImages();
    removeEventListener('LOAD_PROGRESS', progressBar, false);
    removeEventListener('LOAD_COMPLETE', closeLoading, false);
  }

  function progressBar() {
    // With LOADER.percentage() function you take the percentage
    $( "#loading" ).text( Math.round(LOADER.percentage()) + "%" );
  }

  function addImages(){
    var _total = _listImages.length;

    for (var i = 0; i < _total; i++) {
      $(".wrap-content").append('<img src="'+ _listImages[i] +'" alt="">');
    };
  }

  window.onload = initLoader;

}(window));