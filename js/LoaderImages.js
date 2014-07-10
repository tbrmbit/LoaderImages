(function(window){
	"use strict";

	var _images = new Array,
		_total = 0,
		_loaded = 0,
		_percentage = 0,
		LOAD_COMPLETE = document.createEvent("Event"),
		LOAD_PROGRESS = document.createEvent("Event");

	var LoaderImages = function( list ){
		this.initialize( list );
	}

	var _this = LoaderImages.prototype;

	_this.initialize = function( obj ){
		_images = obj;
		_total = _images.length;

		this.createEvents();
		this.loadImage();
	}

	_this.createEvents = function(){
		LOAD_COMPLETE.initEvent('LOAD_COMPLETE',true,true);
		LOAD_PROGRESS.initEvent('LOAD_PROGRESS',true,true);
	}

	_this.loadImage = function(){
		var _img_ = new Image();
		_img_.onload = function() {
			_loaded++;
			_this.progress();
			_this.dispatch();
		}
		//_img_.src = _images[_loaded].image;
		_img_.src = _images[_loaded];
	}

	_this.dispatch = function(){
		( _total == _loaded ) ? dispatchEvent(LOAD_COMPLETE) : this.loadImage();
	}

	_this.progress = function(e){
		_percentage = (_loaded / _total) * 100;
		dispatchEvent(LOAD_PROGRESS);
	}

	_this.percentage = function() {
		return _percentage;
	};

	window.LoaderImages = LoaderImages;

}(window));