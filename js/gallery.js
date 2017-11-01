(function() {

   var Gallery = function() {
      this.element = document.querySelector('.gallery');
      this._closeButton = this.element.querySelector('.gallery-close');
      this._prevButton = this.element.querySelector('.gallery-thumbnails-control-prev');
      this._nextButton = this.element.querySelector('.gallery-thumbnails-control-next');
      this._onCloseClick = this._onCloseClick.bind(this);
      this._onPrevButton = this._onPrevButton.bind(this);
      this._onNextButton = this._onNextButton.bind(this);
      var _currentImage;
      this.thumbnailsContainer = this.element.querySelector('.gallery-thumbnails');
      this.previewImage = this.element.querySelector('.gallery-picture');
   }

   Gallery.prototype = new HotelBase();

   Gallery.prototype.render = function() {
      this.element.classList.remove('hidden');
      this._data.getPictures().forEach(function(pic, i) {
         var picture = new Image();
         picture.classList.add('gallery-thumbnails-image');
         picture.height = 40;
         picture.src = pic;
         this.thumbnailsContainer.appendChild(picture);
      }, this);
      this.setCurrentImage(0);
      this._closeButton.addEventListener('click', this._onCloseClick);
      this._prevButton.addEventListener('click', this._onPrevButton);
      this._nextButton.addEventListener('click', this._onNextButton);
   };

   Gallery.prototype.remove = function() {
      this.element.classList.add('hidden');
      this._data.getPictures().forEach(function() {
         this.thumbnailsContainer.removeChild(this.thumbnailsContainer.firstChild);
      }, this);
      this.previewImage.src = '';
      this._currentImage = null;
      this._closeButton.removeEventListener('click', this._onCloseClick);
      this._prevButton.removeEventListener('click', this._onPrevButton);
      this._nextButton.removeEventListener('click', this._onNextButton);
   };

    Gallery.prototype._onCloseClick = function() {
      this.remove();
   };

   Gallery.prototype._onPrevButton = function() {
     if (this._currentImage === 0) {
        return;
     }
     var i = this._currentImage - 1;
     this.setCurrentImage(i);
  };

  Gallery.prototype._onNextButton = function() {
    if (this._currentImage === (this._data.getPictures().length - 1)) {      
      return;
    }
    var i = this._currentImage + 1;
    this.setCurrentImage(i);
};

   Gallery.prototype.setCurrentImage = function(i) {
      if (this._currentImage === i) {
         return;
      }
      this._currentImage = i;
      if (this._currentImage === 0) {
        this._prevButton.disabled = true;
        this._prevButton.classList.add('no-hover');
      }
      if (this._currentImage === (this._data.getPictures().length - 1)) {
       this._nextButton.disabled = true;
       this._nextButton.classList.add('no-hover');
      }
      if (this.element.querySelector('.gallery-thumbnails-image.active')) {
         this.element.querySelector('.gallery-thumbnails-image.active').classList.remove('active');
      }      
      this.previewImage.src = this._data.getPictures()[i];
      this.element.querySelectorAll('.gallery-thumbnails-image')[i].classList.add('active');
   };

   window.Gallery = Gallery;

})();
