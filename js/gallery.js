(function() {

   var Gallery = function() {
      this.element = document.querySelector('.gallery');
      this._closeButton = this.element.querySelector('.gallery-close');
      this._onCloseClick = this._onCloseClick.bind(this);
      var _currentImage = 0;
      this.thumbnailsContainer = this.element.querySelector('.gallery-thumbnails');
      this.previewImage = this.element.querySelector('.gallery-picture');
      var fragment = document.createDocumentFragment();
   }

   Gallery.prototype.show = function() {
      this.element.classList.remove('hidden');

      this.data.pictures.forEach(function(pic, i) {
         var picture = new Image();
         picture.classList.add('gallery-thumbnails-image');
         picture.height = 40;
         picture.src = pic;
         this.fragment.appendChild(picture);
      }, this);
      this.thumbnailsContainer.appendChild(this.fragment);
      this.setCurrentImage(0);
      this._closeButton.addEventListener('click', this._onCloseClick);
   };

   Gallery.prototype.hide = function() {
      this.element.classList.add('hidden');
      this.thumbnailsContainer.removeChild(this.fragment);
      this._closeButton.removeEventListener('click', this._onCloseClick);
   };

    Gallery.prototype._onCloseClick = function() {
      this.hide();
   };

   Gallery.prototype.setCurrentImage = function(i) {
      if (this._currentImage === i) {
         return;
      }
      this._currentImage = i;
      if (this.element.querySelector('.gallery-thumbnails-image.active')) {
         this.element.querySelector('.gallery-thumbnails-image.active').classList.remove('active');
      }
      this.element.querySelectorAll('.gallery-thumbnails-image')[i].classList.add('active');

      this.previewImage.src = this.data.pictures[i];
   };

   window.Gallery = Gallery;

})();
